namespace Bizmind.User {
	"use strict";
	var app = getModule();

	export interface IAccountDetailsPayload {
	    account: IAccountPayload;
	    transactions: ITransactionPayload[];
	}
	export interface INewTransaction{
		account: string;
		title: string;
		note: string;
		type: string;
		category: string;
		amount: number;
	}
	
	class AccountController implements angular.IController {
		private accountId:string;
		public showEditAccount:boolean = false;
		public showNewTransaction:boolean = false;
		public createNewTransaction:INewTransaction = ({} as any) as INewTransaction;
		public transactionTypes:ICustomOptions[];
		public transactionCategories:ICustomOptions[];
		public accountTypes:ICustomOptions[];
		public currencies:ICurrency[];
		public activeAccount:IAccountPayload;
		public allTransactions:ITransactionPayload[];
		public accountTotal:number = 0.00;
		public accountTotalCash:number = 0.00;
		public accountTotalTransfer:number = 0.00;
		public accountTotalCheque:number = 0.00;
		public accountTotalOther:number = 0.00;
		public accountTotalCredit:number = 0.00;
		public accountTotalDebit:number = 0.00;
	    constructor(
	      private $http: ng.IHttpService,
	      private session: ISessionService,
	      private $state: angular.ui.IStateService,
		  private $stateParams: ng.ui.IStateParamsService,
	      private $window: ng.IWindowService
	    ) {
	      	//this.goHome();
			this.accountId = $stateParams.accountId;
		  	console.debug("Account Board " + this.accountId);			
    	}
		$onInit = async () => { 
			this.loadCurrencies();
			await this.loadAccountDetails();
			await this.loadTransactionTypes();
			await this.loadTransactionCategories();
			this.loadAccountTypes();
		};
		
	    public loadAccountDetails = async () =>  {
			this.$http.get("/api/accounts/" + this.accountId).then(
	        	(result: ng.IHttpPromiseCallbackArg<IAccountDetailsPayload>) => {
					console.info(result.data);
	            	this.activeAccount = result.data.account;
					this.allTransactions = result.data.transactions;
					for (let i = 0; i < result.data.transactions.length; i++) {
						let transaction = result.data.transactions[i];
						//console.log("Checking " + transaction.transactionType.name + " Of " + transaction.category.name);
						if(transaction.transactionType.name == 'CREDIT'){
							this.accountTotal = this.accountTotal + transaction.amount;
							this.accountTotalCredit = this.accountTotalCredit + transaction.amount;
						}else if(transaction.transactionType.name == 'DEBIT'){
							this.accountTotal = this.accountTotal - transaction.amount;
							this.accountTotalDebit = this.accountTotalDebit + transaction.amount;
						}
						
						if(transaction.category.name == 'CASH'){
							this.accountTotalCash = this.accountTotalCash + transaction.amount;
						}else if(transaction.category.name == 'TRANSFER'){
							this.accountTotalTransfer = this.accountTotalTransfer + transaction.amount;
						}else if(transaction.category.name == 'CHEQUE'){
							this.accountTotalCheque = this.accountTotalCheque + transaction.amount;
						}else{
							this.accountTotalOther = this.accountTotalOther  + transaction.amount;
						}
					}
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
		
		public toggleAddNewTransaction(transactionTypeName:string): void {
			this.createNewTransaction.type = transactionTypeName;
			this.showNewTransaction = true;
			if(transactionTypeName == "none"){
				this.showNewTransaction = !this.showNewTransaction;
			}
	    }

		public toggleEdit(): void {
			this.showEditAccount = !this.showEditAccount;
	    }

		public addNewTransaction = async () => {
			//console.debug(this.createNewTransaction);
			this.createNewTransaction.account = this.accountId;
	    	await this.$http.post("/api/transactions/", this.createNewTransaction).then(
	          (result: ng.IHttpResponse<ITransactionPayload>) => {
	            if (this.allTransactions) {
	              this.allTransactions.push(result.data);
	            }
				this.loadAccountDetails();
				this.toggleAddNewTransaction("none");
				//this.reloadPage();
	          },
	          error => {
				console.error(error);
	            this.toggleAddNewTransaction("none");
	          }
	        );
	    }

		public updateAccount(): void {
	      this.$http.put("/api/accounts/", this.activeAccount).then(
	          (result: ng.IHttpResponse<IAccountPayload>) => {
	            this.activeAccount = result.data;
				this.toggleEdit();
				//this.reloadPage();
	          },
	          error => {
				console.error(error);
	            //this.toggleAddNewAccount();
	          }
	      );
	    }

		public deleteAccount(): void {
	      this.$http.delete("/api/accounts/"+this.activeAccount.id).then(
	          (result: ng.IHttpResponse<string>) => {
				this.$state.go(
				"root.user.dashboard", 
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

		public openTransaction(tranx:ITransactionPayload){
			//var id = acc.id;
			this.$state.go(
				"root.user.transaction", 
				{ transactionId: tranx.id }, 
				<ng.ui.IStateOptions>{
            		reload: true
          		}
			);
		}

		private reloadPage(): void {
	        this.$window.location.reload();
	    }

    	public static $inject: string[] = ["$http", "SessionService", "$state", "$stateParams", "$window"];
	}

	app.controller("user.AccountController", AccountController);
}