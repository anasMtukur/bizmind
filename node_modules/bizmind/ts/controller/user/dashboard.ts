namespace Bizmind.User {
	"use strict";

	var app = getModule();

	interface ICreateAccountPayload {
	    name: string;
	    description: string;
	    type: string;
		currency: string;
	    startBalance: number;
	}

	class UserDashboardController implements angular.IController {
		private showAddNewAccount:boolean = false;
		public accountTypes:ICustomOptions[];
		public currencies:ICurrency[];
		public newAccount:ICreateAccountPayload;
		public allAccounts:IAccountPayload[];
		public allAccountsCount:number = 0;
	    constructor(
			private $http: ng.IHttpService,
			private session: ISessionService,
			private $state: angular.ui.IStateService,
        	private $scope: ng.IScope,
			private $window: ng.IWindowService
		
	    ) {
			this.loadAccountTypes();
			this.loadCurrencies();
			this.listAccounts();
	    }
	
		public toggleAddNewAccount(): void {
	      this.showAddNewAccount = !this.showAddNewAccount;
	    }
	
		public loadAccountTypes(): void {
			this.$http.get("/api/account_types/").then(
	        	(result: ng.IHttpPromiseCallbackArg<[ICustomOptions]>) => {
	            	this.accountTypes = result.data;
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
		
		public listAccounts(): void {
			this.$http.get("/api/accounts/").then(
	        	(result: ng.IHttpPromiseCallbackArg<[IAccountPayload]>) => {
	            	this.allAccounts = result.data;
					this.allAccountsCount = result.data.length;
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
	      this.$http.post("/api/accounts/", this.newAccount).then(
	          (result: ng.IHttpResponse<IAccountPayload>) => {
	            if (this.allAccounts) {
	              this.allAccounts.push(result.data);
	            }
				this.toggleAddNewAccount();
	            this.newAccount.name = "";
	            this.newAccount.description = "";
	            this.newAccount.type = "";
	            this.newAccount.startBalance = 0.00;
				//this.reloadPage();
	          },
	          error => {
				console.error(error);
	            //this.toggleAddNewAccount();
	          }
	        );
	    }

		private updateDom(): void {
	        if (!this.$scope.$$phase) {
	            this.$scope.$apply();
	        }
	    }

		private reloadPage(): void {
	        this.$window.location.reload();
	    }
		
		public goBack(){
			this.$window.history.back();
		}
		
		public openAccount(acc:IAccountPayload){
			//var id = acc.id;
			this.$state.go(
				"root.user.account", 
				{ accountId: acc.id }, 
				<ng.ui.IStateOptions>{
            		reload: true
          		}
			);
		}
		
		
	    $onInit = () => { };
	    public static $inject: string[] = ["$http", "SessionService", "$state", "$scope", "$window"];
	}

	app.controller("user.DashboardController", UserDashboardController);
}