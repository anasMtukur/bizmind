namespace Bizmind {
    "use strict";

    const app = getModule();

    class RootController implements angular.IController {
        private isAuthenticated: boolean;
        constructor(
            private $http: ng.IHttpService,
            private $mdToast: angular.material.IToastService,
            private $mdDialog: angular.material.IDialogService,
            private $state: angular.ui.IStateService,
            private session: ISessionService,
            private $scope: ng.IScope,
            private $window: ng.IWindowService,
            public $mdSidenav: ng.material.ISidenavService
        ) {
			console.debug("The root is here");
            if (this.session.isAuthenticated()) {
                this.isAuthenticated = this.session.isAuthenticated();
            } else {
                console.debug("The session is not authenticated");
            }
        }
		public goHome(): void {
            if (this.session.isAuthenticated()) {
                if (this.session.isUser()) {
                    this.$state.go("root.user.dashboard");
                } else if (this.session.isModerator()) {
                    this.$state.go("root.moderator.dashboard");
                } else {
                    this.$state.go("root.user.home");
                }
            } else {
                this.$state.go("root.user.login");
            }
        }
        public goState(state: string, params?:any): void {
            this.$state.go(state, params, {reload: true});
        }
		
		public goBack(){
			this.$window.history.back();
		}
		
		public currencyFormatter(num:number) {
			 if (num >= 1000000000000) {
		        return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
		     }
		     if (num >= 1000000000) {
		        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
		     }
		     if (num >= 1000000) {
		        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		     }
		     if (num >= 1000) {
		        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		     }
		     return num;
		}

        $onInit = () => { };
        public static $inject: string[] = ["$http", "$mdToast", "$mdDialog", "$state", "SessionService", "$scope", "$window", "$mdSidenav"];
    }

    app.controller("RootController", RootController);
}
