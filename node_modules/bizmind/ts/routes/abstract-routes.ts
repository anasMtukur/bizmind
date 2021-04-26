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
            name: "root",
            templateUrl: "views/root.html",
            controller: "RootController",
            controllerAs: "root"
          });
    	  
          $stateProvider.state(<angular.ui.IState>{
            name: "root.user",
            abstract: true,
            template: "<ui-view/>"
          });
    
          $stateProvider.state(<angular.ui.IState>{
            name: "root.moderator",
            abstract: true,
            template: "<ui-view/>"
          });
          $stateProvider.state(<angular.ui.IState>{
            name: "root.admin",
            abstract: true,
            template: "<ui-view/>"
          });
          /*$stateProvider.state(<angular.ui.IState>{
            name: "root.tips",
            templateUrl: "views/tips-test.html",
            controller: "TipsTestController",
            controllerAs: "tipsTest",
            url: "/tips-test"
          });*/
        }
        ]);
}