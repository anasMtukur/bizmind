namespace Bizmind {
    var app = getModule();

    class UploadChange implements ng.IDirective {
        // public restrict: string = "A";
        public scope = {
            ngUploadChange: "&"
        };
        constructor() {
        }
        public link: ng.IDirectiveLinkFn = ($scope: any, $element:
            ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {

            $element.on("change", (event) => {
                $scope.$apply(() => {
                    $scope.ngUploadChange({ $event: event })
                })
            })

            $scope.$on("$destroy", () => {
                $element.off();
            });
        }
    }
    app.directive("ngUploadChange", [() => new UploadChange()]);

    class CompareTo implements ng.IDirective {
        // public restrict: string = "A";
        public require: string = "ngModel";
        public scope = {
            compare: "="
        };
        constructor() {
        }
        public link: ng.IDirectiveLinkFn = (scope: any, element:
            ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: any) => {
            ngModel.$validators.compareTo = function (modelValue) {

                return modelValue == scope.compare;
            };

            scope.$watch("compare", () => {
                ngModel.$validate();
            });
        }
    }
    app.directive("compareTo", [() => new CompareTo()]);

	app.directive('compile', ['$compile', function ($compile) {
	    return function(scope, element, attrs) {
	        scope.$watch(
	            function(scope) {
	                // watch the 'compile' expression for changes
	                return scope.$eval(attrs.compile);
	            },
	            function(value) {
	                // when the 'compile' expression changes
	                // assign it into the current DOM
	                element.html(value);
	                // compile the new DOM and link it to the current
	                // scope.
	                // NOTE: we only compile .childNodes so that
	                // we don't get into infinite loop compiling ourselves
	                $compile(element.contents())(scope);
	            }
	        );
	    };
	}])
}