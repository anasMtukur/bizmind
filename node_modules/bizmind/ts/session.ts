namespace Bizmind {
    "use strict";

    const app = getModule();

    export interface ISessionService {
        token: string;
        setToken(token: string): void;
        isAuthenticated: () => boolean;
        blocked: () => boolean;
		isUser: () => boolean;
        isModerator: () => boolean;
        isAdmin: () => boolean;
        isRoleUser(): boolean;
        isRoleAdmin(): boolean;
        isRoleModerator(): boolean;
        hasAdminPermissions(): boolean;
        getName: () => string;
        getEmail: () => string;
        getUsername: () => string;
        logout(): void;
    }

    export interface IAuthority {
        authority: string;
    }

    export interface IToken {
        authorities: IAuthority[];
        sub: string;
        exp: number;
        name: string;
        fullname?: string;
        email: string;
        blocked?: boolean;
    }

    class SessionService {
        private token: string;
        constructor(
			private roleConstants: IRoleConstants
		) {
            if (!this.token || this.token.trim() === "") {
                this.thawToken();
            }
        }
        
        public logout(): void {
            this.token = undefined;
            sessionStorage.removeItem("token");
            window.location.assign("https://www.example.com");
        }

        public setToken(token: string): void {
            try {
                this.token = token.split(" ")[1];
                this.saveToken();
            } catch (e) {
                this.token = null;
            }
        }
        public isAuthenticated(): boolean {
            if (this.token) {
                // We do this to appease the Typescript compiler. And to appease the Javascript evaluator
                return true;
            } else {
                return false;
            }
        }
        public blocked(): boolean {
            try {
                const blocked = this.parseToken().blocked;
                if (blocked) {
                    // We do this to appease the Typescript compiler. And to appease the Javascript evaluator
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        public getName(): string {
            try {
                return this.parseToken().fullname;
            } catch (e) {
                return "Anonymous";
            }
        }
        public getUsername(): string {
            try {
                return this.parseToken().name;
            } catch (e) {
                return "Anonymous";
            }
        }
        public getEmail(): string {
            try {
                return this.parseToken().email;
            } catch (e) {
                return "anonymous@bizmind.com";
            }
        }

        private parseToken(): IToken {
            try {
                var itoken: IToken = JSON.parse(atob(this.token.split(".")[1]));
                return itoken;
            } catch (e) {
                return null;
            }
        }

        private saveToken(): void {
            sessionStorage.removeItem("token");
            sessionStorage.setItem("token", this.token);
        }

        private thawToken(): void {
            if (sessionStorage.getItem("token")) {
                this.token = sessionStorage.getItem("token");
            }
        }

        public isUser(): boolean {
            try {
                return this.parseToken()
                    .authorities.map<string>((value, index) => value.authority)
                    .some((value, index) => value === "ROLE_USER");
            } catch (e) {
                return false;
            }
        }
        public isModerator(): boolean {
            try {
                return this.parseToken()
                    .authorities.map<string>((value, index) => value.authority)
                    .some((value, index) => value === "ROLE_MODERATOR");
            } catch (e) {
                return false;
            }
        }
        public isAdmin(): boolean {
            try {
                return this.parseToken()
                    .authorities.map<string>((value, index) => value.authority)
                    .some((value, index) => value === "ROLE_ADMIN");
            } catch (e) {
                return false;
            }
        }

        public isRoleUser = () =>
            this.parseToken().authorities.some(authority => authority.authority === this.roleConstants.identifiers.USER);

        public isRoleAdmin = () =>
            this.parseToken().authorities.some(authority => authority.authority === this.roleConstants.identifiers.ADMIN);

        public isRoleModerator = () =>
            this.parseToken().authorities.some(authority => authority.authority === this.roleConstants.identifiers.MODERATOR);

        public hasAdminPermissions = () => this.isRoleAdmin();

        public static $inject: string[] = ["roleConstants"];
    }

    app.service("SessionService", SessionService);
}
