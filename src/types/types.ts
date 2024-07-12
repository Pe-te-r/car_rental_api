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
export interface UserDetails{
    role: "admin" | "user" | null;
    id: number;
    name: string;
    email: string | null;
    contact_phone: string | null;
    bookings: {
        id: number;
        vehicle_id: number | null;
        location_id: number | null;
        booking_date: string;
        totalAmount: string | null;
    }[];
    customerSupportTickets: {
        description: string,
        status: string | null,
        subject: string | null,
        id: number ,
    }[];

}