var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bizmind;
(function (Bizmind) {
    "use strict";
    angular.module("bizmind", [
        "ui.router",
        "ngMaterial",
        "ngAnimate",
        "ngMessages",
        "ui.validate",
        "ngSanitize",
        "moment-picker",
        "angular-loading-bar"
    ]);
    Bizmind.getModule = function () {
        return angular.module("bizmind");
    };
    Bizmind.SURVEY_QUESTIONS = [
        { text: 'How easy was the system to use?', min: 'Very Difficult', max: 'Very easy' },
        { text: 'How clear was the guidance given to use the system?', min: 'Very Unclear', max: 'Very Clear' },
        { text: 'Overall how would you rate the system', min: 'Very bad', max: 'Great!' }
    ];
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var app = Bizmind.getModule();
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
    var getJsonFromUrl = function (hashBased) {
        var query;
        if (hashBased) {
            var pos = location.href.indexOf("?");
            if (pos == -1)
                return [];
            query = location.href.substr(pos + 1);
        }
        else {
            query = location.search.substr(1);
        }
        var result = {};
        query.split("&").forEach(function (part) {
            if (!part)
                return;
            part = part.split("+").join(" "); // replace every + with space, regexp-free version
            var eq = part.indexOf("=");
            var key = eq > -1 ? part.substr(0, eq) : part;
            var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
            var from = key.indexOf("[");
            if (from == -1)
                result[decodeURIComponent(key)] = val;
            else {
                var to = key.indexOf("]", from);
                var index = decodeURIComponent(key.substring(from + 1, to));
                key = decodeURIComponent(key.substring(0, from));
                if (!result[key])
                    result[key] = [];
                if (!index)
                    result[key].push(val);
                else
                    result[key][index] = val;
            }
        });
        return result;
    };
    app.run([
        "$state", "$window", "$rootScope", "$location", "SessionService", "$http",
        function ($state, $http, $window, $rootScope, $location, SessionService) {
            if (is.safari()) {
                angular.element("html").addClass("is-safari");
            }
        }
    ]);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    "use strict";
    var app = Bizmind.getModule();
    var SessionService = /** @class */ (function () {
        function SessionService(roleConstants) {
            var _this = this;
            this.roleConstants = roleConstants;
            this.isRoleUser = function () {
                return _this.parseToken().authorities.some(function (authority) { return authority.authority === _this.roleConstants.identifiers.USER; });
            };
            this.isRoleAdmin = function () {
                return _this.parseToken().authorities.some(function (authority) { return authority.authority === _this.roleConstants.identifiers.ADMIN; });
            };
            this.isRoleModerator = function () {
                return _this.parseToken().authorities.some(function (authority) { return authority.authority === _this.roleConstants.identifiers.MODERATOR; });
            };
            this.hasAdminPermissions = function () { return _this.isRoleAdmin(); };
            if (!this.token || this.token.trim() === "") {
                this.thawToken();
            }
        }
        SessionService.prototype.logout = function () {
            this.token = undefined;
            sessionStorage.removeItem("token");
            window.location.assign("https://www.example.com");
        };
        SessionService.prototype.setToken = function (token) {
            try {
                this.token = token.split(" ")[1];
                this.saveToken();
            }
            catch (e) {
                this.token = null;
            }
        };
        SessionService.prototype.isAuthenticated = function () {
            if (this.token) {
                // We do this to appease the Typescript compiler. And to appease the Javascript evaluator
                return true;
            }
            else {
                return false;
            }
        };
        SessionService.prototype.blocked = function () {
            try {
                var blocked = this.parseToken().blocked;
                if (blocked) {
                    // We do this to appease the Typescript compiler. And to appease the Javascript evaluator
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        };
        SessionService.prototype.getName = function () {
            try {
                return this.parseToken().fullname;
            }
            catch (e) {
                return "Anonymous";
            }
        };
        SessionService.prototype.getUsername = function () {
            try {
                return this.parseToken().name;
            }
            catch (e) {
                return "Anonymous";
            }
        };
        SessionService.prototype.getEmail = function () {
            try {
                return this.parseToken().email;
            }
            catch (e) {
                return "anonymous@bizmind.com";
            }
        };
        SessionService.prototype.parseToken = function () {
            try {
                var itoken = JSON.parse(atob(this.token.split(".")[1]));
                return itoken;
            }
            catch (e) {
                return null;
            }
        };
        SessionService.prototype.saveToken = function () {
            sessionStorage.removeItem("token");
            sessionStorage.setItem("token", this.token);
        };
        SessionService.prototype.thawToken = function () {
            if (sessionStorage.getItem("token")) {
                this.token = sessionStorage.getItem("token");
            }
        };
        SessionService.prototype.isUser = function () {
            try {
                return this.parseToken()
                    .authorities.map(function (value, index) { return value.authority; })
                    .some(function (value, index) { return value === "ROLE_USER"; });
            }
            catch (e) {
                return false;
            }
        };
        SessionService.prototype.isModerator = function () {
            try {
                return this.parseToken()
                    .authorities.map(function (value, index) { return value.authority; })
                    .some(function (value, index) { return value === "ROLE_MODERATOR"; });
            }
            catch (e) {
                return false;
            }
        };
        SessionService.prototype.isAdmin = function () {
            try {
                return this.parseToken()
                    .authorities.map(function (value, index) { return value.authority; })
                    .some(function (value, index) { return value === "ROLE_ADMIN"; });
            }
            catch (e) {
                return false;
            }
        };
        SessionService.$inject = ["roleConstants"];
        return SessionService;
    }());
    app.service("SessionService", SessionService);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    "use strict";
    var app = Bizmind.getModule();
    var JWTInterceptor = /** @class */ (function () {
        function JWTInterceptor($location, $q, session) {
            var _this = this;
            this.$location = $location;
            this.$q = $q;
            this.session = session;
            this.request = function (config) {
                config.headers = config.headers || {};
                if (_this.session && _this.session.token)
                    config.headers.Authorization = 'Bearer ' + _this.session.token;
                return config;
            };
            this.requestError = function (rejection) {
                return _this.$q.reject(rejection);
            };
            this.response = function (response) {
                return response || _this.$q.when(response);
            };
            this.responseError = function (rejection) {
                console.error(rejection);
                return _this.$q.reject(rejection);
            };
        }
        return JWTInterceptor;
    }());
    app.factory("JWTInterceptor", ["$location", "$q", "SessionService", function ($location, $q, session) {
            return new JWTInterceptor($location, $q, session);
        }
    ]);
    app.config([
        "$httpProvider",
        function ($httpProvider) {
            $httpProvider.interceptors.push("JWTInterceptor");
        }
    ]);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var Filters;
    (function (Filters) {
        "use strict";
        var app = Bizmind.getModule();
        var TrustedSource = /** @class */ (function () {
            function TrustedSource($sce) {
                return function (recordingURL) {
                    return $sce.trustAsResourceUrl(recordingURL);
                };
            }
            TrustedSource.$inject = ["$sce"];
            return TrustedSource;
        }());
        var SecondsToMinutes = /** @class */ (function () {
            function SecondsToMinutes() {
                return function (seconds) { return seconds / 60; };
            }
            return SecondsToMinutes;
        }());
        var RoundedSecondsToMinutes = /** @class */ (function () {
            function RoundedSecondsToMinutes() {
                return function (seconds) { return Math.ceil(seconds / 60); };
            }
            return RoundedSecondsToMinutes;
        }());
        var SecondsToMMSS = /** @class */ (function () {
            function SecondsToMMSS() {
                return function (t) {
                    if (isNaN(t)) {
                        return "00:00";
                    }
                    var minutes = Math.floor(t / 60.0);
                    var seconds = Math.floor(t % 60);
                    return ((minutes < 10 ? "0" : "") + minutes +
                        ":" +
                        (seconds < 10 ? "0" : "") + seconds);
                };
            }
            return SecondsToMMSS;
        }());
        // @ts-ignore
        app.filter("TrustedSource", TrustedSource);
        // @ts-ignore
        app.filter("SecondsToMinutes", SecondsToMinutes);
        // @ts-ignore
        app.filter("RoundedSecondsToMinutes", RoundedSecondsToMinutes);
        // @ts-ignore
        app.filter("SecondsToMMSS", SecondsToMMSS);
    })(Filters = Bizmind.Filters || (Bizmind.Filters = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    "use strict";
    var app = Bizmind.getModule();
    /*
    * This controller simply redirects you to the correct place if you arrive at /#/
    * */
    var HomeController = /** @class */ (function () {
        function HomeController($http, session, $state, $window) {
            this.$http = $http;
            this.session = session;
            this.$state = $state;
            this.$window = $window;
            this.$onInit = function () { };
            console.debug("Lets Go Home");
            //this.goHome();
        }
        HomeController.prototype.goHome = function () {
            console.debug("Lets Go Home");
            if (this.session.isAuthenticated()) {
                if (this.session.isAdmin()) {
                    this.$state.go("root.admin.dashboard");
                }
                else if (this.session.isModerator()) {
                    this.$state.go("root.moderator.dashboard");
                }
                else {
                    this.$state.go("root.user.dashboard");
                }
            }
            else {
                this.$state.go("root.user.home");
            }
        };
        HomeController.$inject = ["$http", "SessionService", "$state", "$window"];
        return HomeController;
    }());
    app.controller("HomeController", HomeController);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    "use strict";
    var app = Bizmind.getModule();
    var RootController = /** @class */ (function () {
        function RootController($http, $mdToast, $mdDialog, $state, session, $scope, $window, $mdSidenav) {
            this.$http = $http;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.$state = $state;
            this.session = session;
            this.$scope = $scope;
            this.$window = $window;
            this.$mdSidenav = $mdSidenav;
            this.$onInit = function () { };
            console.debug("The root is here");
            if (this.session.isAuthenticated()) {
                this.isAuthenticated = this.session.isAuthenticated();
            }
            else {
                console.debug("The session is not authenticated");
            }
        }
        RootController.prototype.goHome = function () {
            if (this.session.isAuthenticated()) {
                if (this.session.isUser()) {
                    this.$state.go("root.user.dashboard");
                }
                else if (this.session.isModerator()) {
                    this.$state.go("root.moderator.dashboard");
                }
                else {
                    this.$state.go("root.user.home");
                }
            }
            else {
                this.$state.go("root.user.login");
            }
        };
        RootController.prototype.goState = function (state, params) {
            this.$state.go(state, params, { reload: true });
        };
        RootController.prototype.goBack = function () {
            this.$window.history.back();
        };
        RootController.prototype.currencyFormatter = function (num) {
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
        };
        RootController.$inject = ["$http", "$mdToast", "$mdDialog", "$state", "SessionService", "$scope", "$window", "$mdSidenav"];
        return RootController;
    }());
    app.controller("RootController", RootController);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var UserHomeController = /** @class */ (function () {
            function UserHomeController($http, session, $state, $window) {
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$window = $window;
                this.$onInit = function () { };
                //this.goHome();
                console.debug("You Are Home");
            }
            UserHomeController.prototype.goHome = function () {
                if (this.session.isAuthenticated()) {
                    this.$state.go("root.user.dashboard");
                }
                else {
                    //this.$window.location.assign("https://www.example.com");
                    this.$state.go("root.user.login");
                }
            };
            UserHomeController.$inject = ["$http", "SessionService", "$state", "$window"];
            return UserHomeController;
        }());
        app.controller("user.HomeController", UserHomeController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        /*
        * This controller simply redirects you to the correct place if you arrive at /#/
        * */
        var LoginController = /** @class */ (function () {
            function LoginController($http, session, $state, $mdToast, $window) {
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$mdToast = $mdToast;
                this.$window = $window;
                this.loginPayload = {
                    username: "",
                    password: ""
                };
                this.$onInit = function () { };
                //console.log("Please Login Now");
            }
            LoginController.prototype.signin = function () {
                var _this = this;
                if (this.loginPayload.username.indexOf('@') !== -1) {
                    this.loginPayload.username = this.loginPayload.username.split("@")[0];
                }
                this.$http.post("/login", this.loginPayload).then(function (res) {
                    _this.session.setToken(res.headers("Authorization"));
                    if (_this.session.isUser() && !_this.session.isAdmin() && !_this.session.isModerator()) {
                        _this.$state.go("root.user.dashboard", {}, {
                            reload: true
                        });
                    }
                    else if (_this.session.isAdmin()) {
                    }
                    else if (_this.session.isModerator()) {
                    }
                }, function (error) {
                    _this.$mdToast.show(_this.$mdToast.simple()
                        .textContent("Login Failed")
                        .hideDelay(10000));
                    console.error(error);
                });
            };
            LoginController.$inject = ["$http", "SessionService", "$state", "$mdToast", "$window"];
            return LoginController;
        }());
        app.controller("user.LoginController", LoginController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var UserDashboardController = /** @class */ (function () {
            function UserDashboardController($http, session, $state, $scope, $window) {
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$scope = $scope;
                this.$window = $window;
                this.showAddNewAccount = false;
                this.allAccountsCount = 0;
                this.$onInit = function () { };
                this.loadAccountTypes();
                this.loadCurrencies();
                this.listAccounts();
            }
            UserDashboardController.prototype.toggleAddNewAccount = function () {
                this.showAddNewAccount = !this.showAddNewAccount;
            };
            UserDashboardController.prototype.loadAccountTypes = function () {
                var _this = this;
                this.$http.get("/api/account_types/").then(function (result) {
                    _this.accountTypes = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            UserDashboardController.prototype.loadCurrencies = function () {
                var _this = this;
                this.$http.get("/api/currencies/").then(function (result) {
                    _this.currencies = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            UserDashboardController.prototype.listAccounts = function () {
                var _this = this;
                this.$http.get("/api/accounts/").then(function (result) {
                    _this.allAccounts = result.data;
                    _this.allAccountsCount = result.data.length;
                }, function (error) {
                    console.error("Error Loading Accounts");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            UserDashboardController.prototype.create = function () {
                var _this = this;
                this.$http.post("/api/accounts/", this.newAccount).then(function (result) {
                    if (_this.allAccounts) {
                        _this.allAccounts.push(result.data);
                    }
                    _this.toggleAddNewAccount();
                    _this.newAccount.name = "";
                    _this.newAccount.description = "";
                    _this.newAccount.type = "";
                    _this.newAccount.startBalance = 0.00;
                    //this.reloadPage();
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            UserDashboardController.prototype.updateDom = function () {
                if (!this.$scope.$$phase) {
                    this.$scope.$apply();
                }
            };
            UserDashboardController.prototype.reloadPage = function () {
                this.$window.location.reload();
            };
            UserDashboardController.prototype.goBack = function () {
                this.$window.history.back();
            };
            UserDashboardController.prototype.openAccount = function (acc) {
                //var id = acc.id;
                this.$state.go("root.user.account", { accountId: acc.id }, {
                    reload: true
                });
            };
            UserDashboardController.$inject = ["$http", "SessionService", "$state", "$scope", "$window"];
            return UserDashboardController;
        }());
        app.controller("user.DashboardController", UserDashboardController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var app = Bizmind.getModule();
    var UploadChange = /** @class */ (function () {
        function UploadChange() {
            // public restrict: string = "A";
            this.scope = {
                ngUploadChange: "&"
            };
            this.link = function ($scope, $element, $attrs) {
                $element.on("change", function (event) {
                    $scope.$apply(function () {
                        $scope.ngUploadChange({ $event: event });
                    });
                });
                $scope.$on("$destroy", function () {
                    $element.off();
                });
            };
        }
        return UploadChange;
    }());
    app.directive("ngUploadChange", [function () { return new UploadChange(); }]);
    var CompareTo = /** @class */ (function () {
        function CompareTo() {
            // public restrict: string = "A";
            this.require = "ngModel";
            this.scope = {
                compare: "="
            };
            this.link = function (scope, element, attrs, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.compare;
                };
                scope.$watch("compare", function () {
                    ngModel.$validate();
                });
            };
        }
        return CompareTo;
    }());
    app.directive("compareTo", [function () { return new CompareTo(); }]);
    app.directive('compile', ['$compile', function ($compile) {
            return function (scope, element, attrs) {
                scope.$watch(function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                }, function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);
                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                });
            };
        }]);
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    'use strict';
    var app = Bizmind.getModule();
    ;
    var names;
    (function (names) {
        names["USER"] = "User";
        names["ADMIN"] = "Admin";
        names["MODERATOR"] = "Moderator";
    })(names || (names = {}));
    ;
    var identifiers;
    (function (identifiers) {
        identifiers["USER"] = "ROLE_USER";
        identifiers["ADMIN"] = "ROLE_ADMIN";
        identifiers["MODERATOR"] = "ROLE_MODERATOR";
    })(identifiers || (identifiers = {}));
    ;
    app.constant("roleConstants", { names: names, identifiers: identifiers });
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var AccountController = /** @class */ (function () {
            function AccountController($http, session, $state, $stateParams, $window) {
                var _this = this;
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.showEditAccount = false;
                this.showNewTransaction = false;
                this.createNewTransaction = {};
                this.accountTotal = 0.00;
                this.accountTotalCash = 0.00;
                this.accountTotalTransfer = 0.00;
                this.accountTotalCheque = 0.00;
                this.accountTotalOther = 0.00;
                this.accountTotalCredit = 0.00;
                this.accountTotalDebit = 0.00;
                this.$onInit = function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.loadCurrencies();
                                return [4 /*yield*/, this.loadAccountDetails()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.loadTransactionTypes()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, this.loadTransactionCategories()];
                            case 3:
                                _a.sent();
                                this.loadAccountTypes();
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.loadAccountDetails = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/accounts/" + this.accountId).then(function (result) {
                            console.info(result.data);
                            _this.activeAccount = result.data.account;
                            _this.allTransactions = result.data.transactions;
                            for (var i = 0; i < result.data.transactions.length; i++) {
                                var transaction = result.data.transactions[i];
                                //console.log("Checking " + transaction.transactionType.name + " Of " + transaction.category.name);
                                if (transaction.transactionType.name == 'CREDIT') {
                                    _this.accountTotal = _this.accountTotal + transaction.amount;
                                    _this.accountTotalCredit = _this.accountTotalCredit + transaction.amount;
                                }
                                else if (transaction.transactionType.name == 'DEBIT') {
                                    _this.accountTotal = _this.accountTotal - transaction.amount;
                                    _this.accountTotalDebit = _this.accountTotalDebit + transaction.amount;
                                }
                                if (transaction.category.name == 'CASH') {
                                    _this.accountTotalCash = _this.accountTotalCash + transaction.amount;
                                }
                                else if (transaction.category.name == 'TRANSFER') {
                                    _this.accountTotalTransfer = _this.accountTotalTransfer + transaction.amount;
                                }
                                else if (transaction.category.name == 'CHEQUE') {
                                    _this.accountTotalCheque = _this.accountTotalCheque + transaction.amount;
                                }
                                else {
                                    _this.accountTotalOther = _this.accountTotalOther + transaction.amount;
                                }
                            }
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadTransactionTypes = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transaction_types/").then(function (result) {
                            _this.transactionTypes = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadTransactionCategories = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transaction_categories/").then(function (result) {
                            _this.transactionCategories = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.addNewTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //console.debug(this.createNewTransaction);
                                this.createNewTransaction.account = this.accountId;
                                return [4 /*yield*/, this.$http.post("/api/transactions/", this.createNewTransaction).then(function (result) {
                                        if (_this.allTransactions) {
                                            _this.allTransactions.push(result.data);
                                        }
                                        _this.loadAccountDetails();
                                        _this.toggleAddNewTransaction("none");
                                        //this.reloadPage();
                                    }, function (error) {
                                        console.error(error);
                                        _this.toggleAddNewTransaction("none");
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                //this.goHome();
                this.accountId = $stateParams.accountId;
                console.debug("Account Board " + this.accountId);
            }
            AccountController.prototype.loadAccountTypes = function () {
                var _this = this;
                this.$http.get("/api/account_types/").then(function (result) {
                    _this.accountTypes = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            AccountController.prototype.loadCurrencies = function () {
                var _this = this;
                this.$http.get("/api/currencies/").then(function (result) {
                    _this.currencies = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            AccountController.prototype.toggleAddNewTransaction = function (transactionTypeName) {
                this.createNewTransaction.type = transactionTypeName;
                this.showNewTransaction = true;
                if (transactionTypeName == "none") {
                    this.showNewTransaction = !this.showNewTransaction;
                }
            };
            AccountController.prototype.toggleEdit = function () {
                this.showEditAccount = !this.showEditAccount;
            };
            AccountController.prototype.updateAccount = function () {
                var _this = this;
                this.$http.put("/api/accounts/", this.activeAccount).then(function (result) {
                    _this.activeAccount = result.data;
                    _this.toggleEdit();
                    //this.reloadPage();
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            AccountController.prototype.deleteAccount = function () {
                var _this = this;
                this.$http.delete("/api/accounts/" + this.activeAccount.id).then(function (result) {
                    _this.$state.go("root.user.dashboard", {
                        reload: true
                    });
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            AccountController.prototype.openTransaction = function (tranx) {
                //var id = acc.id;
                this.$state.go("root.user.transaction", { transactionId: tranx.id }, {
                    reload: true
                });
            };
            AccountController.prototype.reloadPage = function () {
                this.$window.location.reload();
            };
            AccountController.$inject = ["$http", "SessionService", "$state", "$stateParams", "$window"];
            return AccountController;
        }());
        app.controller("user.AccountController", AccountController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var RegisterController = /** @class */ (function () {
            function RegisterController($http, session, $state, $mdToast, $window) {
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$mdToast = $mdToast;
                this.$window = $window;
                this.$onInit = function () { };
                //this.goHome();
                console.log("Please Login Now");
            }
            RegisterController.prototype.generateUsername = function () {
                if (this.payload.email !== null && this.payload.email != "") {
                    var newUsername = this.payload.email.split('@')[0];
                    this.payload.username = newUsername;
                }
            };
            RegisterController.prototype.signup = function () {
                var _this = this;
                this.$http.post("/api/auth/signup", this.payload).then(function (result) {
                    console.debug(result.data);
                    _this.newUser = result.data;
                    var loginPayload = {
                        username: _this.newUser.username,
                        password: _this.payload.password
                    };
                    _this.$http.post("/api/auth/signin", loginPayload).then(function (res) {
                        _this.session.setToken(res.headers("Authorization"));
                        if (_this.session.isUser() && !_this.session.isAdmin() && !_this.session.isModerator()) {
                            _this.$state.go("root.user.dashboard", {}, {
                                reload: true
                            });
                        }
                        else if (_this.session.isAdmin()) {
                        }
                        else if (_this.session.isModerator()) {
                        }
                    }, function (error) {
                        _this.$mdToast.show(_this.$mdToast.simple()
                            .textContent("Login Failed")
                            .hideDelay(10000)
                            .theme("toasttheme"));
                        console.error(error);
                    });
                }, function (error) {
                    _this.$mdToast.show(_this.$mdToast.simple()
                        .textContent("Signup Failed")
                        .hideDelay(10000)
                        .theme("toasttheme"));
                    console.error(error);
                });
            };
            RegisterController.$inject = ["$http", "SessionService", "$state", "$mdToast", "$window"];
            return RegisterController;
        }());
        app.controller("user.RegisterController", RegisterController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        /*
        * This controller simply redirects you to the correct place if you arrive at /#/
        * */
        var ResetController = /** @class */ (function () {
            function ResetController($http, session, $state, $window) {
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$window = $window;
                this.$onInit = function () { };
                //this.goHome();
                console.log("Please Login Now");
            }
            ResetController.prototype.goHome = function () {
                if (this.session.isAuthenticated()) {
                    this.$state.go("root.user.dashboard");
                }
                else {
                    //this.$window.location.assign("https://www.example.com");
                    this.$state.go("root.user.login");
                }
            };
            ResetController.$inject = ["$http", "SessionService", "$state", "$window"];
            return ResetController;
        }());
        app.controller("user.ResetController", ResetController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var SalesDetailsController = /** @class */ (function () {
            function SalesDetailsController($http, session, $state, $stateParams, $window) {
                var _this = this;
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.showEditSales = false;
                this.newEntry = {};
                this.$onInit = function () {
                    _this.loadSalesDetails();
                    _this.loadSalesEntryTypes();
                    _this.loadCurrencies();
                    _this.loadTransactionCategories();
                };
                this.loadSalesDetails = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/sales/" + this.salesId).then(function (result) {
                            console.info(result.data);
                            _this.activeSale = result.data.sales;
                            _this.allEntries = result.data.salesEntries;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadSalesEntryTypes = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/sales_entry_types/").then(function (result) {
                            _this.entryTypes = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadTransactionCategories = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transaction_categories/").then(function (result) {
                            _this.transactionCategories = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.addNewSalesEntry = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //console.debug(this.createNewTransaction);
                                this.newEntry.sales = this.salesId;
                                return [4 /*yield*/, this.$http.post("/api/sales-entry/", this.newEntry).then(function (result) {
                                        if (_this.allEntries) {
                                            _this.allEntries.push(result.data);
                                        }
                                        _this.loadSalesDetails();
                                        _this.toggleAddNewEntry("none");
                                        //this.reloadPage();
                                    }, function (error) {
                                        console.error(error);
                                        _this.toggleAddNewEntry("none");
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.salesId = $stateParams.salesId;
            }
            SalesDetailsController.prototype.loadCurrencies = function () {
                var _this = this;
                this.$http.get("/api/currencies/").then(function (result) {
                    _this.currencies = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            SalesDetailsController.prototype.toggleEdit = function () {
                this.showEditSales = !this.showEditSales;
            };
            SalesDetailsController.prototype.updateSale = function () {
                var _this = this;
                this.$http.put("/api/sales/", this.activeSale).then(function (result) {
                    _this.activeSale = result.data;
                    _this.toggleEdit();
                    //this.reloadPage();
                }, function (error) {
                    console.error(error);
                    _this.toggleEdit();
                });
            };
            SalesDetailsController.prototype.deleteSale = function () {
                var _this = this;
                this.$http.delete("/api/sales/" + this.activeSale.id).then(function (result) {
                    _this.$state.go("root.user.sales", {
                        reload: true
                    });
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            SalesDetailsController.prototype.toggleAddNewEntry = function (entryType) {
                this.resetNewEntry();
                this.newEntry.entryType = entryType;
                this.showAddNewEntry = true;
                if (entryType == "none") {
                    this.showAddNewEntry = !this.showAddNewEntry;
                }
            };
            SalesDetailsController.prototype.resetNewEntry = function () {
                this.newEntry.sales = "";
                this.newEntry.title = "";
                this.newEntry.note = "";
                this.newEntry.entryType = "";
                this.newEntry.category = undefined;
                this.newEntry.amount = 0;
            };
            SalesDetailsController.$inject = ["$http", "SessionService", "$state", "$stateParams", "$window"];
            return SalesDetailsController;
        }());
        app.controller("user.SalesDetailsController", SalesDetailsController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        var SalesController = /** @class */ (function () {
            function SalesController($http, session, $state, $window) {
                var _this = this;
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$window = $window;
                this.allSalesCount = 0;
                this.showAddNewSale = false;
                this.$onInit = function () {
                    _this.loadCurrencies();
                    _this.listSales();
                };
                console.log("Sales");
            }
            SalesController.prototype.loadCurrencies = function () {
                var _this = this;
                this.$http.get("/api/currencies/").then(function (result) {
                    _this.currencies = result.data;
                }, function (error) {
                    console.error("Error Loading Account Types");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            SalesController.prototype.toggleAddNew = function () {
                this.showAddNewSale = !this.showAddNewSale;
            };
            SalesController.prototype.listSales = function () {
                var _this = this;
                this.$http.get("/api/sales/").then(function (result) {
                    _this.allSales = result.data;
                    _this.allSalesCount = result.data.length;
                }, function (error) {
                    console.error("Error Loading Accounts");
                    /*this.$mdToast.showSimple(
                      "Some error has happened. See console for details"
                    );*/
                });
            };
            SalesController.prototype.create = function () {
                var _this = this;
                this.$http.post("/api/sales/", this.newSale).then(function (result) {
                    if (_this.allSales) {
                        _this.allSales.push(result.data);
                    }
                    _this.toggleAddNew();
                    _this.newSale.title = "";
                    _this.newSale.description = "";
                    _this.newSale.currency = undefined;
                    _this.newSale.totalAmount = 0.00;
                    //this.reloadPage();
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            SalesController.prototype.openSale = function (sale) {
                //var id = acc.id;
                this.$state.go("root.user.sales-details", { salesId: sale.id }, {
                    reload: true
                });
            };
            SalesController.prototype.goHome = function () {
                if (this.session.isAuthenticated()) {
                    this.$state.go("root.user.dashboard");
                }
                else {
                    //this.$window.location.assign("https://www.example.com");
                    this.$state.go("root.user.login");
                }
            };
            SalesController.$inject = ["$http", "SessionService", "$state", "$window"];
            return SalesController;
        }());
        app.controller("user.SalesController", SalesController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var User;
    (function (User) {
        "use strict";
        var app = Bizmind.getModule();
        //declare var jsPDF;
        var TransactionController = /** @class */ (function () {
            function TransactionController($http, session, $state, $stateParams, $window) {
                var _this = this;
                this.$http = $http;
                this.session = session;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.$window = $window;
                this.$onInit = function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.loadTransactionDetails()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.loadTransactionTypes()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, this.loadTransactionCategories()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                this.loadTransactionDetails = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transactions/single/" + this.transactionId).then(function (result) {
                            console.info(result.data);
                            _this.activeTransaction = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadTransactionTypes = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transaction_types/").then(function (result) {
                            _this.transactionTypes = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.loadTransactionCategories = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.$http.get("/api/transaction_categories/").then(function (result) {
                            _this.transactionCategories = result.data;
                        }, function (error) {
                            console.error("Error Loading Account Types");
                            /*this.$mdToast.showSimple(
                              "Some error has happened. See console for details"
                            );*/
                        });
                        return [2 /*return*/];
                    });
                }); };
                this.transactionId = $stateParams.transactionId;
            }
            TransactionController.prototype.exportAsPDF = function () {
                var data = document.getElementById("transaction-details");
                html2canvas(data).then(function (canvas) {
                    var contentDataURL = canvas.toDataURL('image/png');
                    //let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
                    var pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
                    //pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0, 29.7);  
                    pdf.addImage(contentDataURL, 'PNG', 7, 1, 7, 10);
                    pdf.save('Filename.pdf');
                });
            };
            TransactionController.prototype.toggleEdit = function () {
                this.showEditAccount = !this.showEditAccount;
            };
            TransactionController.prototype.updateTransaction = function () {
                var _this = this;
                this.$http.put("/api/transactions/", this.activeTransaction).then(function (result) {
                    _this.activeTransaction = result.data;
                    _this.toggleEdit();
                    //this.reloadPage();
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            TransactionController.prototype.deleteTransaction = function () {
                var _this = this;
                this.$http.delete("/api/transactions/" + this.activeTransaction.id).then(function (result) {
                    _this.$state.go("root.user.account", { accountId: _this.activeTransaction.account.id }, {
                        reload: true
                    });
                }, function (error) {
                    console.error(error);
                    //this.toggleAddNewAccount();
                });
            };
            TransactionController.prototype.goHome = function () {
                if (this.session.isAuthenticated()) {
                    this.$state.go("root.user.dashboard");
                }
                else {
                    //this.$window.location.assign("https://www.example.com");
                    this.$state.go("root.user.login");
                }
            };
            TransactionController.$inject = ["$http", "SessionService", "$state", "$stateParams", "$window"];
            return TransactionController;
        }());
        app.controller("user.TransactionController", TransactionController);
    })(User = Bizmind.User || (Bizmind.User = {}));
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var app = Bizmind.getModule();
    app.config([
        "$locationProvider",
        function ($locationProvider) {
            $locationProvider.hashPrefix("");
        }
    ]);
    app.config([
        "$stateProvider",
        function ($stateProvider) {
            $stateProvider.state({
                name: "root",
                templateUrl: "views/root.html",
                controller: "RootController",
                controllerAs: "root"
            });
            $stateProvider.state({
                name: "root.user",
                abstract: true,
                template: "<ui-view/>"
            });
            $stateProvider.state({
                name: "root.moderator",
                abstract: true,
                template: "<ui-view/>"
            });
            $stateProvider.state({
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
})(Bizmind || (Bizmind = {}));
var Bizmind;
(function (Bizmind) {
    var app = Bizmind.getModule();
    app.config([
        "$locationProvider",
        function ($locationProvider) {
            $locationProvider.hashPrefix("");
        }
    ]);
    app.config([
        "$stateProvider",
        function ($stateProvider) {
            $stateProvider.state({
                name: "root.home",
                templateUrl: "views/home.html",
                controller: "HomeController",
                controllerAs: "home",
                url: "/",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state({
                name: "root.user.home",
                templateUrl: "views/user/home.html",
                controller: "user.HomeController",
                controllerAs: "userhome",
                url: "/app/home",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state({
                name: "root.user.login",
                templateUrl: "views/user/login.html",
                controller: "user.LoginController",
                controllerAs: "login",
                url: "/app/login",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state({
                name: "root.user.register",
                templateUrl: "views/user/register.html",
                controller: "user.RegisterController",
                controllerAs: "register",
                url: "/app/register",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state({
                name: "root.user.reset",
                templateUrl: "views/user/reset.html",
                controller: "user.ResetController",
                controllerAs: "reset",
                url: "/app/reset",
                data: {
                    info: "views/user/info/home.html"
                }
            });
            $stateProvider.state({
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
                        function ($state, SessionService, $q, $timeout) {
                            if (!SessionService.isUser()) {
                                $timeout(function () { $state.go("root.user.home"); }, 0);
                                return $q.reject();
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    ]
                }
            });
            $stateProvider.state({
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
                        function ($state, SessionService, $q, $timeout) {
                            if (!SessionService.isUser()) {
                                $timeout(function () { $state.go("root.user.home"); }, 0);
                                return $q.reject();
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    ]
                }
            });
            $stateProvider.state({
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
                        function ($state, SessionService, $q, $timeout) {
                            if (!SessionService.isUser()) {
                                $timeout(function () { $state.go("root.user.home"); }, 0);
                                return $q.reject();
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    ]
                }
            });
            $stateProvider.state({
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
                        function ($state, SessionService, $q, $timeout) {
                            if (!SessionService.isUser()) {
                                $timeout(function () { $state.go("root.user.home"); }, 0);
                                return $q.reject();
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    ]
                }
            });
            $stateProvider.state({
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
                        function ($state, SessionService, $q, $timeout) {
                            if (!SessionService.isUser()) {
                                $timeout(function () { $state.go("root.user.home"); }, 0);
                                return $q.reject();
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    ]
                }
            });
        }
    ]);
    var redirectIfNotLoggedIn = function (SessionService, $timeout, $state, $q) {
        var newRoute = null;
        if (!SessionService.isAuthenticated())
            newRoute = 'root.user.login';
        else if (!SessionService.hasUserPermissions())
            newRoute = 'root.user.dashboard';
        if (newRoute !== null) {
            $timeout(function () { return $state.go(newRoute); }, 0);
            return $q.reject();
        }
        return $q.resolve();
    };
})(Bizmind || (Bizmind = {}));
