export interface UserCredentials {
    username: string;
    password: string;
}

export const USERS = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
}
