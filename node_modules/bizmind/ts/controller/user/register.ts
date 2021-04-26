namespace Bizmind.User {
  "use strict";

  var app = getModule();

  export interface IRegisterPayload {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }

  class RegisterController implements angular.IController {
	private payload: IRegisterPayload;
	private newUser: IUser;
    constructor(
      private $http: ng.IHttpService,
      private session: ISessionService,
      private $state: angular.ui.IStateService,
	  private $mdToast: ng.material.IToastService,
      private $window: ng.IWindowService
    ) {
      //this.goHome();
	  console.log("Please Login Now");
    }

    public generateUsername(): void {
      if (this.payload.email !== null && this.payload.email != "") {
      	var newUsername = this.payload.email.split('@')[0];
		this.payload.username = newUsername;
      }
    }

	public signup(): void {
		
		this.$http.post("/api/auth/signup", this.payload).then(
	        (result: ng.IHttpPromiseCallbackArg<IUser>) => {
				console.debug(result.data);
	        	this.newUser = result.data;
				var loginPayload: ILoginPayload = <ILoginPayload>{
					username: this.newUser.username,
					password: this.payload.password
				}
				
				this.$http.post("/api/auth/signin", loginPayload).then(
				(res: ng.IHttpPromiseCallbackArg<any>) => {
					this.session.setToken(res.headers("Authorization"));
					if (this.session.isUser() && !this.session.isAdmin() && !this.session.isModerator()) {
						this.$state.go("root.user.dashboard", {}, <ng.ui.IStateOptions>{
						    reload: true
						});
					} else if (this.session.isAdmin()) {
						
					} else if (this.session.isModerator()) {
						
					}
				}, (error: any) => {
		            this.$mdToast.show(
		            	this.$mdToast.simple()
			                .textContent("Login Failed")
			                .hideDelay(10000)
			                .theme("toasttheme")
					);
		            console.error(error);
		        });
			  	
			},
	        (error: any) => {
	        	this.$mdToast.show(
		            this.$mdToast.simple()
		              .textContent("Signup Failed")
		              .hideDelay(10000)
					  .theme("toasttheme")
	            );
				console.error(error);
	        }
    	);
    }

    $onInit = () => { };
    public static $inject: string[] = ["$http", "SessionService", "$state", "$mdToast", "$window"];
  }

  app.controller("user.RegisterController", RegisterController);
}