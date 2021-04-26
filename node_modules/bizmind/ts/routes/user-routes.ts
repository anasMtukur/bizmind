namespace Bizmind {
    var app = getModule();
    app.config([
        "$locationProvider",
        function ($locationProvider) {
            $locationProvider.hashPrefix("");
        }
    ]);

    app.config([
        "$stateProvider",
        ($stateProvider: angular.ui.IStateProvider) => {
			$stateProvider.state(<angular.ui.IState>{
	          name: "root.home",
	          templateUrl: "views/home.html",
	          controller: "HomeController",
	          controllerAs: "home",
	          url: "/",
	          data: {
	            info: "views/user/info/home.html"
	          }
	        });

			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.home",
                templateUrl: "views/user/home.html",
                controller: "user.HomeController",
                controllerAs: "userhome",
                url: "/app/home",
                data: {
                    info: "views/user/info/home.html"
                }

            });
            $stateProvider.state(<angular.ui.IState>{
                name: "root.user.login",
                templateUrl: "views/user/login.html",
                controller: "user.LoginController",
                controllerAs: "login",
                url: "/app/login",
                data: {
                    info: "views/user/info/home.html"
                }

            });
			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.register",
                templateUrl: "views/user/register.html",
                controller: "user.RegisterController",
                controllerAs: "register",
                url: "/app/register",
                data: {
                    info: "views/user/info/home.html"
                }

            });
			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.reset",
                templateUrl: "views/user/reset.html",
                controller: "user.ResetController",
                controllerAs: "reset",
                url: "/app/reset",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state(<angular.ui.IState>{
                name: "root.user.dashboard",
                templateUrl: "views/user/dashboard.html",
                controller: "user.DashboardController",
                controllerAs: "dashboard",
                url: "/app/dashboard",
                data: {
                  //info: "views/company/info/slatelogs.html"
                },
                resolve: {
                  redirectIfNotLoggedIn: [
				  	"$state", "SessionService", "$q", "$timeout",
                    ($state: ng.ui.IStateService, SessionService: ISessionService, 
						$q: ng.IQService, $timeout: ng.ITimeoutService) => {
						if ( !SessionService.isUser() ) {
							$timeout( () => { $state.go("root.user.home"); }, 0 );
							return $q.reject();
						} else {
							return $q.resolve();
						}
                    }
                  ]
                }
            });
			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.account",
                templateUrl: "views/user/account.html",
                controller: "user.AccountController",
                controllerAs: "account",
                url: "/app/account?accountId",
                data: {
                  //info: "views/company/info/slatelogs.html"
                },
				params: { accountId: "" },
                resolve: {
                  redirectIfNotLoggedIn: [
				  	"$state", "SessionService", "$q", "$timeout",
                    ($state: ng.ui.IStateService, SessionService: ISessionService, 
						$q: ng.IQService, $timeout: ng.ITimeoutService) => {
						if ( !SessionService.isUser() ) {
							$timeout( () => { $state.go("root.user.home"); }, 0 );
							return $q.reject();
						} else {
							return $q.resolve();
						}
                    }
                  ]
                }
            });
			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.transaction",
                templateUrl: "views/user/transaction.html",
                controller: "user.TransactionController",
                controllerAs: "transaction",
                url: "/app/account/transaction?transactionId",
                data: {
                  //info: "views/company/info/slatelogs.html"
                },
				params: { transactionId: "" },
                resolve: {
                  redirectIfNotLoggedIn: [
				  	"$state", "SessionService", "$q", "$timeout",
                    ($state: ng.ui.IStateService, SessionService: ISessionService, 
						$q: ng.IQService, $timeout: ng.ITimeoutService) => {
						if ( !SessionService.isUser() ) {
							$timeout( () => { $state.go("root.user.home"); }, 0 );
							return $q.reject();
						} else {
							return $q.resolve();
						}
                    }
                  ]
                }
            });
			
			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.sales",
                templateUrl: "views/user/sales.html",
                controller: "user.SalesController",
                controllerAs: "sales",
                url: "/app/sales",
                data: {
                  //info: "views/company/info/slatelogs.html"
                },
                resolve: {
                  redirectIfNotLoggedIn: [
				  	"$state", "SessionService", "$q", "$timeout",
                    ($state: ng.ui.IStateService, SessionService: ISessionService, 
						$q: ng.IQService, $timeout: ng.ITimeoutService) => {
						if ( !SessionService.isUser() ) {
							$timeout( () => { $state.go("root.user.home"); }, 0 );
							return $q.reject();
						} else {
							return $q.resolve();
						}
                    }
                  ]
                }
            });

			$stateProvider.state(<angular.ui.IState>{
                name: "root.user.sales-details",
                templateUrl: "views/user/sales-details.html",
                controller: "user.SalesDetailsController",
                controllerAs: "salesDetails",
                url: "/app/sales/details?salesId",
                data: {
                  //info: "views/company/info/slatelogs.html"
                },
				params: { salesId: "" },
                resolve: {
                  redirectIfNotLoggedIn: [
				  	"$state", "SessionService", "$q", "$timeout",
                    ($state: ng.ui.IStateService, SessionService: ISessionService, 
						$q: ng.IQService, $timeout: ng.ITimeoutService) => {
						if ( !SessionService.isUser() ) {
							$timeout( () => { $state.go("root.user.home"); }, 0 );
							return $q.reject();
						} else {
							return $q.resolve();
						}
                    }
                  ]
                }
            });
        }
	]);

    const redirectIfNotLoggedIn = (SessionService, $timeout, $state, $q) => {
        let newRoute = null;
        if (!SessionService.isAuthenticated()) newRoute = 'root.user.login';
        else if (!SessionService.hasUserPermissions()) newRoute = 'root.user.dashboard';
        if (newRoute !== null) {
            $timeout(() => $state.go(newRoute), 0);
            return $q.reject();
        }
        return $q.resolve();
    }
}