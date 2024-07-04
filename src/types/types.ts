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

export interface loginReturnData{
    id:number,
    name: string,
    email: string | null,
    role: string | null, 
    contact_phone: string | null
    token: string
}