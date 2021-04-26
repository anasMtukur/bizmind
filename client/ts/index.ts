declare var Rollbar: any;
namespace Bizmind {
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

	export var getModule: () => ng.IModule = () => {
		return angular.module("bizmind");
	};
  
	export interface IContactUs {
	    name: string;
	    email: string;
	    phone: string;
	}
  
  
	export interface INewUser {
	    fullname: string;
	    username: string;
	    email: string;
	    password: string;
	}

	export interface IUser {
	    id: string;
	    fullname: string;
	    username: string;
	    email: string;
	    password: string;
	    roles: [string];
	}
	
	export interface ILoginPayload {
	    username: string;
	    password: string;
	}
	
	export interface ICustomOptions {
	    id: string;
	    name: string;
	    readableName: string;
	}
	
	export interface ICurrency {
	    id: string;
	    name: string;
	    unit: string;
	}
	
	export interface IAccountPayload {
	    id: string;
	    name: string;
	    description: string;
	    type: ICustomOptions;
		currency: ICurrency;
	    createdDate: string;
		updateDateTime: string;
	}
	
	export interface ITransactionPayload {
	    id: string;
	    title: string;
	    notes: string;
	    account: IAccountPayload;
	    transactionType: ICustomOptions;
	    category: ICustomOptions;
		amount: number;
	    createdDate: string;
		updateDateTime: string;
	}
	
	export interface ISalesPayload {
	    id: string;
	    name: string;
	    description: string;
		currency: ICurrency;
		totalAmount: number;
	    createdDate: string;
		updateDateTime: string;
	}
	
	export interface ISalesEntryPayload {
	    id: string;
	    title: string;
	    notes: string;
	    account: IAccountPayload;
	    salesEntryType: ICustomOptions;
		amount: number;
	    createdDate: string;
		updateDateTime: string;
	}

	export let SURVEY_QUESTIONS = [
	    { text: 'How easy was the system to use?', min: 'Very Difficult', max: 'Very easy' },
	    { text: 'How clear was the guidance given to use the system?', min: 'Very Unclear', max: 'Very Clear' },
	    { text: 'Overall how would you rate the system', min: 'Very bad', max: 'Great!' }
	]
}
