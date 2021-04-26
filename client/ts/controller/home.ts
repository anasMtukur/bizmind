namespace Bizmind {
    "use strict";

    var app = getModule();

	/*
	* This controller simply redirects you to the correct place if you arrive at /#/
	* */
	class HomeController implements angular.IController {
	    constructor(
	      private $http: ng.IHttpService,
	      private session: ISessionService,
	      private $state: angular.ui.IStateService,
	      private $window: ng.IWindowService
	    ) {
			console.debug("Lets Go Home");
	    	//this.goHome();
	    }

	    public goHome(): void {
		  console.debug("Lets Go Home");
	      if (this.session.isAuthenticated()) {
	        if (this.session.isAdmin()) {
	          this.$state.go("root.admin.dashboard");
	        } else if (this.session.isModerator()) {
	          this.$state.go("root.moderator.dashboard");
	        } else {
	          this.$state.go("root.user.dashboard");
	        }
	      } else {
	        this.$state.go("root.user.home");
	      }
	    }

	    $onInit = () => { };
	    public static $inject: string[] = ["$http", "SessionService", "$state", "$window"];
	}

	app.controller("HomeController", HomeController);
}
