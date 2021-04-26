namespace Bizmind {
    'use strict';

    const app = getModule();

    export interface IRoleConstants {
        names: {
            USER: string,
            ADMIN: string,
            MODERATOR: string
        },
        identifiers: {
            USER: string,
            ADMIN: string,
            MODERATOR: string
        }
    };

    enum names {
        USER = 'User',
        ADMIN = 'Admin',
        MODERATOR = 'Moderator'
    };

    enum identifiers {
        USER = 'ROLE_USER',
        ADMIN = 'ROLE_ADMIN',
        MODERATOR = 'ROLE_MODERATOR'
    };


    app.constant("roleConstants", { names, identifiers });
}
