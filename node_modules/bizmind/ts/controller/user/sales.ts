namespace Bizmind.User {
  "use strict";

  var app = getModule();
  interface INewSalePayload {
    title: string;
    description: string;
	currency: ICurrency;
    totalAmount: number;
  }

  class SalesController implements angular.IController {
	public currencies:ICurrency[];
	public newSale:INewSalePayload;
	public allSales:ISalesPayload[];
	public allSalesCount:number = 0;
	private showAddNewSale:boolean = false;
	
    constructor(
      private $http: ng.IHttpService,
      private session: ISessionService,
      private $state: angular.ui.IStateService,
      private $window: ng.IWindowService
    ) {
	  console.log("Sales");
    }

	$onInit = () => { 
		this.loadCurrencies();
		this.listSales();
	};
	
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
	
	public toggleAddNew(): void {
		this.showAddNewSale = !this.showAddNewSale;
	}
	
	public listSales(): void {
		this.$http.get("/api/sales/").then(
        	(result: ng.IHttpPromiseCallbackArg<[ISalesPayload]>) => {
            	this.allSales = result.data;
				this.allSalesCount = result.data.length;
			},
        	error => {
				console.error("Error Loading Accounts");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public create(): void {
      this.$http.post("/api/sales/", this.newSale).then(
          (result: ng.IHttpResponse<ISalesPayload>) => {
            if (this.allSales) {
              this.allSales.push(result.data);
            }
			this.toggleAddNew();
            this.newSale.title = "";
            this.newSale.description = "";
            this.newSale.currency = undefined;
            this.newSale.totalAmount = 0.00;
			//this.reloadPage();
          },
          error => {
			console.error(error);
            //this.toggleAddNewAccount();
          }
        );
    }

	public openSale(sale:ISalesPayload){
		//var id = acc.id;
		this.$state.go(
			"root.user.sales-details", 
			{ salesId: sale.id }, 
			<ng.ui.IStateOptions>{
        		reload: true
      		}
		);
	}

    public goHome(): void {
      if (this.session.isAuthenticated()) {
      	this.$state.go("root.user.dashboard");
      } else {
        //this.$window.location.assign("https://www.example.com");
		this.$state.go("root.user.login");
      }
    }

    
    public static $inject: string[] = ["$http", "SessionService", "$state", "$window"];
  }

  app.controller("user.SalesController", SalesController);
}