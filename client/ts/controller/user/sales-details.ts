namespace Bizmind.User {
  "use strict";

  var app = getModule();

  export interface ISalesDetailsPayload {
	sales: ISalesPayload;
	salesEntries: ISalesEntryPayload[];
  }

  export interface INewSalesEntry{
	sales: string;
	title: string;
	note: string;
	entryType: string;
	category: ICustomOptions;
	amount: number;
  }

  class SalesDetailsController implements angular.IController {
	private salesId:string;
	public showEditSales:boolean = false;
	public activeSale:ISalesPayload;
	public allEntries:ISalesEntryPayload[];
	public entryTypes:ICustomOptions[];
	public currencies:ICurrency[];
	public showAddNewEntry:boolean;
	public transactionCategories:ICustomOptions[];
	public newEntry:INewSalesEntry = ({} as any) as INewSalesEntry;
	
    constructor(
      private $http: ng.IHttpService,
      private session: ISessionService,
      private $state: angular.ui.IStateService,
	  private $stateParams: ng.ui.IStateParamsService,
      private $window: ng.IWindowService
    ) {
      this.salesId = $stateParams.salesId;
    }

	$onInit = () => {
		this.loadSalesDetails();
		this.loadSalesEntryTypes();
		this.loadCurrencies();
		this.loadTransactionCategories();
	};
	
	public loadSalesDetails = async () =>  {
		this.$http.get("/api/sales/" + this.salesId).then(
        	(result: ng.IHttpPromiseCallbackArg<ISalesDetailsPayload>) => {
				console.info(result.data);
            	this.activeSale = result.data.sales;
				this.allEntries = result.data.salesEntries;
			},
        	error => {
				console.error("Error Loading Account Types");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public loadSalesEntryTypes = async () =>  {
		this.$http.get("/api/sales_entry_types/").then(
        	(result: ng.IHttpPromiseCallbackArg<[ICustomOptions]>) => {
            	this.entryTypes = result.data;
			},
        	error => {
				console.error("Error Loading Account Types");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public loadTransactionCategories = async () =>  {
		this.$http.get("/api/transaction_categories/").then(
        	(result: ng.IHttpPromiseCallbackArg<[ICustomOptions]>) => {
            	this.transactionCategories = result.data;
			},
        	error => {
				console.error("Error Loading Account Types");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public loadCurrencies(): void {
		this.$http.get("/api/currencies/").then(
        	(result: ng.IHttpPromiseCallbackArg<[ICurrency]>) => {
            	this.currencies = result.data;
			},
        	error => {
				console.error("Error Loading Account Types");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public toggleEdit(): void {
		this.showEditSales = !this.showEditSales;
    }

	public updateSale(): void {
	  this.$http.put("/api/sales/", this.activeSale).then(
	      (result: ng.IHttpResponse<ISalesPayload>) => {
	        this.activeSale = result.data;
			this.toggleEdit();
			//this.reloadPage();
	      },
	      error => {
			console.error(error);
	        this.toggleEdit();
	      }
	  );
	}
	
	public deleteSale(): void {
      this.$http.delete("/api/sales/"+this.activeSale.id).then(
          (result: ng.IHttpResponse<string>) => {
			this.$state.go(
				"root.user.sales", 
				<ng.ui.IStateOptions>{
	        		reload: true
	      		}
			);
          },
          error => {
			console.error(error);
            //this.toggleAddNewAccount();
          }
      );
    }

	public toggleAddNewEntry(entryType:string): void {
		this.resetNewEntry();
		this.newEntry.entryType = entryType;
		this.showAddNewEntry = true;
		if(entryType == "none"){
			this.showAddNewEntry = !this.showAddNewEntry;
		}
    }

	public addNewSalesEntry = async () => {
		//console.debug(this.createNewTransaction);
		this.newEntry.sales = this.salesId;
    	await this.$http.post("/api/sales-entry/", this.newEntry).then(
          (result: ng.IHttpResponse<ISalesEntryPayload>) => {
            if (this.allEntries) {
              this.allEntries.push(result.data);
            }
			this.loadSalesDetails();
			this.toggleAddNewEntry("none");
			//this.reloadPage();
          },
          error => {
			console.error(error);
            this.toggleAddNewEntry("none");
          }
        );
    }

	public resetNewEntry(){
		this.newEntry.sales = "";
		this.newEntry.title = "";
		this.newEntry.note = "";
		this.newEntry.entryType = "";
		this.newEntry.category = undefined;
		this.newEntry.amount = 0;
	}

    public static $inject: string[] = ["$http", "SessionService", "$state", "$stateParams", "$window"];
  }

  app.controller("user.SalesDetailsController", SalesDetailsController);
}