export interface userLogin{
    email: string,
    password: string
}

export interface userTypeReturn{
    name: string;
    email: string | null;
    authentication: {
        password: string;
    } | null;
}