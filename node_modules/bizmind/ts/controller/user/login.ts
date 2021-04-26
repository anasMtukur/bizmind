namespace Bizmind.User {
  "use strict";

  var app = getModule();

  /*
  * This controller simply redirects you to the correct place if you arrive at /#/
  * */
  class LoginController implements angular.IController {
	loginPayload: ILoginPayload = <ILoginPayload>{
		username: "",
		password: ""
	}
    constructor(
		private $http: ng.IHttpService,
		private session: ISessionService,
		private $state: angular.ui.IStateService,
		private $mdToast: ng.material.IToastService,
		private $window: ng.IWindowService
    ) {
	  //console.log("Please Login Now");
    }

    public signin(): void {
		if(this.loginPayload.username.indexOf('@') !== -1){
			this.loginPayload.username = this.loginPayload.username.split("@")[0];
		}
      	this.$http.post("/login", this.loginPayload).then(
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
				);
	            console.error(error);
	        }
		);
    }

    $onInit = () => { };
    public static $inject: string[] = ["$http", "SessionService", "$state", "$mdToast", "$window"];
  }

  app.controller("user.LoginController", LoginController);
}