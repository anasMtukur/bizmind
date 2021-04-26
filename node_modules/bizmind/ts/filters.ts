namespace Bizmind.Filters {
  "use strict";
  var app = getModule();
  interface ICustomFilterService extends angular.IFilterService {
    (name: "TrustedSource"): (recordingURL: string) => string;
    (name: "SecondsToMinutes"): (seconds: number) => number;
    (name: "RoundedSecondsToMinutes"): (seconds: number) => number;
    (name: "SecondsToMMSS"): (t: number) => string;
  }

  class TrustedSource {
    static $inject: string[] = ["$sce"];

    constructor($sce: ng.ISCEService) {
      return (recordingURL: string): string => {
        return $sce.trustAsResourceUrl(recordingURL);
      };
    }
  }

  class SecondsToMinutes {
    constructor() {
      return (seconds: number): number => seconds / 60;
    }
  }
  class RoundedSecondsToMinutes {
    constructor() {
      return (seconds: number): number => Math.ceil(seconds / 60);
    }
  }

  class SecondsToMMSS {
    constructor() {
      return (t: number): string => {
        if (isNaN(t)) {
          return "00:00";
        }
        var minutes: number = Math.floor(t / 60.0);
        var seconds: number = Math.floor(t % 60);
        return (
          (minutes < 10 ? "0" : "") + minutes +
          ":" +
          (seconds < 10 ? "0" : "") + seconds
        );
      };
    }
  }

  // @ts-ignore
  app.filter("TrustedSource", TrustedSource);
  // @ts-ignore
  app.filter("SecondsToMinutes", SecondsToMinutes);
  // @ts-ignore
  app.filter("RoundedSecondsToMinutes", RoundedSecondsToMinutes);
  // @ts-ignore
  app.filter("SecondsToMMSS", SecondsToMMSS);
}