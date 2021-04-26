namespace Bizmind {
  "use strict";

  var app = getModule();

  class JWTInterceptor implements ng.IHttpInterceptor {
    constructor(
      private $location: ng.ILocationService,
      private $q: ng.IQService,
      private session: ISessionService) {
    }

    request = (config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> => {
      config.headers = config.headers || {};
      if (this.session && this.session.token)
        config.headers.Authorization = 'Bearer ' + this.session.token;
      return config;
    }
    requestError = (rejection: any): any => {
      return this.$q.reject(rejection);
    }
    response = <T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<ng.IHttpPromiseCallbackArg<T>> | ng.IHttpPromiseCallbackArg<T> => {
      return response || this.$q.when(response);
    }
    responseError = (rejection: any): any => {
      console.error(rejection);
      return this.$q.reject(rejection);
    }
  }

  app.factory("JWTInterceptor", ["$location", "$q", "SessionService",
    ($location: ng.ILocationService, $q: ng.IQService, session: ISessionService) =>
      new JWTInterceptor($location, $q, session)
  ]);

  app.config([
    "$httpProvider",
    ($httpProvider: ng.IHttpProvider) => {
      $httpProvider.interceptors.push("JWTInterceptor");
    }
  ]);
}