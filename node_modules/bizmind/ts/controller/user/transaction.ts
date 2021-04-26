declare var jsPDF:any;
namespace Bizmind.User {
  "use strict";
  var app = getModule();
  //declare var jsPDF;

  class TransactionController implements angular.IController {
	public activeTransaction: ITransactionPayload;
	public transactionTypes:ICustomOptions[];
	public transactionCategories:ICustomOptions[];
	public transactionId: string;
    public showEditAccount: boolean;
	
    constructor(
      private $http: ng.IHttpService,
      private session: ISessionService,
      private $state: angular.ui.IStateService,
	  private $stateParams: ng.ui.IStateParamsService,
      private $window: ng.IWindowService
    ) {
    	this.transactionId = $stateParams.transactionId;
    }

	$onInit = async () => { 
		await this.loadTransactionDetails();
		await this.loadTransactionTypes();
		await this.loadTransactionCategories();
	};

	public loadTransactionDetails = async () =>  {
		this.$http.get("/api/transactions/single/" + this.transactionId).then(
        	(result: ng.IHttpPromiseCallbackArg<ITransactionPayload>) => {
				console.info(result.data);
            	this.activeTransaction = result.data;
			},
        	error => {
				console.error("Error Loading Account Types");
	            /*this.$mdToast.showSimple(
	              "Some error has happened. See console for details"
	            );*/
        	}
      	);  
	}
	
	public loadTransactionTypes = async () =>  {
		this.$http.get("/api/transaction_types/").then(
        	(result: ng.IHttpPromiseCallbackArg<[ICustomOptions]>) => {
            	this.transactionTypes = result.data;
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
	
	public exportAsPDF(){
	    let data = document.getElementById("transaction-details");  
	    html2canvas(data).then(canvas => {
	      const contentDataURL = canvas.toDataURL('image/png')  
	      //let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
	      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
	      //pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0, 29.7);  
	      pdf.addImage(contentDataURL, 'PNG', 7, 1, 7, 10);  
	      pdf.save('Filename.pdf');   
	    }); 
	}
	
	public toggleEdit(): void {
		this.showEditAccount = !this.showEditAccount;
    }

	public updateTransaction(): void {
      this.$http.put("/api/transactions/", this.activeTransaction).then(
          (result: ng.IHttpResponse<ITransactionPayload>) => {
            this.activeTransaction = result.data;
			this.toggleEdit();
			//this.reloadPage();
          },
          error => {
			console.error(error);
            //this.toggleAddNewAccount();
          }
      );
    }

	public deleteTransaction(): void {
      this.$http.delete("/api/transactions/"+this.activeTransaction.id).then(
          (result: ng.IHttpResponse<string>) => {
			this.$state.go(
			"root.user.account", 
			{ accountId: this.activeTransaction.account.id },
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
	
    public goHome(): void {
      if (this.session.isAuthenticated()) {
      	this.$state.go("root.user.dashboard");
      } else {
        //this.$window.location.assign("https://www.example.com");
		this.$state.go("root.user.login");
      }
    }

    public static $inject: string[] = ["$http", "SessionService", "$state", "$stateParams", "$window"];
  }

  app.controller("user.TransactionController", TransactionController);
}