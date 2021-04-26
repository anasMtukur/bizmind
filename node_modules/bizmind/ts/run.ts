namespace Bizmind {
    var app = getModule();
    app.directive('stopccp', function () {
        return {
            scope: {},
            link: function (scope, element) {
                element.on('cut copy paste', function (event) {
                    event.preventDefault();
                });
            }
        };
    });
    var getJsonFromUrl = (hashBased) => {
        var query;
        if (hashBased) {
            var pos = location.href.indexOf("?");
            if (pos == -1) return [];
            query = location.href.substr(pos + 1);
        } else {
            query = location.search.substr(1);
        }
        var result = {};
        query.split("&").forEach(function (part) {
            if (!part) return;
            part = part.split("+").join(" "); // replace every + with space, regexp-free version
            var eq = part.indexOf("=");
            var key = eq > -1 ? part.substr(0, eq) : part;
            var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
            var from = key.indexOf("[");
            if (from == -1) result[decodeURIComponent(key)] = val;
            else {
                var to = key.indexOf("]", from);
                var index = decodeURIComponent(key.substring(from + 1, to));
                key = decodeURIComponent(key.substring(0, from));
                if (!result[key]) result[key] = [];
                if (!index) result[key].push(val);
                else result[key][index] = val;
            }
        });
        return result;
    }

	app.run([
        "$state", "$window", "$rootScope", "$location", "SessionService", "$http",
        (
            $state: angular.ui.IStateService,
			$http: ng.IHttpService,
            $window: angular.IWindowService,
            $rootScope: angular.IRootScopeService,
            $location: angular.ILocationService,
            SessionService: ISessionService
        ) => {
            if (is.safari()) {
                angular.element("html").addClass("is-safari");
            }          
        }
    ]);
}