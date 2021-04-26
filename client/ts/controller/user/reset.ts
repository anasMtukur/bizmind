namespace Bizmind.User {
  "use strict";

  var app = getModule();

  /*
  * This controller simply redirects you to the correct place if you arrive at /#/
  * */
  class ResetController implements angular.IController {

    constructor(
      private $http: ng.IHttpService,
      private session: ISessionService,
      private $state: angular.ui.IStateService,
      private $window: ng.IWindowService
    ) {
      //this.goHome();
	  console.log("Please Login Now");
    }

    public goHome(): void {
      if (this.session.isAuthenticated()) {
      	this.$state.go("root.user.dashboard");
      } else {
        //this.$window.location.assign("https://www.example.com");
		this.$state.go("root.user.login");
      }
    }

    $onInit = () => { };
    public static $inject: string[] = ["$http", "SessionService", "$state", "$window"];
  }

  app.controller("user.ResetController", ResetController);
}