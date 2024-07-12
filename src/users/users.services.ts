import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { UserSelect, userInsert, usersTable } from "../drizzle/schema"
import { UserDetails } from "../types/types"


export const getOneUserDetails = async (id: number): Promise<Partial <UserDetails> | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        columns:{
            role:true,
            id:true,
            contact_phone:true,
            email:true,
            name:true,
        },
        with:{
            bookings: {
                columns:{
                    location_id: true,
                    booking_date: true,
                    vehicle_id:true,
                    totalAmount: true,
                    id: true
                }
            },
            customerSupportTickets:{
                columns:{
                    description: true,
                    status: true,
                    subject: true,
                    id: true,
                }
            }
        }
    })
}

export const getAllUserDetails=async(limit:number,details:boolean):Promise<Partial<UserSelect>[] | null> => {
    if (limit > 0 && details){
        return await db.query.usersTable.findMany({
            limit: limit,
            with:{
                bookings: true,
                customerSupportTickets:true
            }
        })
    }else if(limit > 0 && !details){
        return await db.query.usersTable.findMany({
            limit: limit,
        })
    
    }else if(details){
        return await db.query.usersTable.findMany({ 
            with:{
                bookings: true,
                customerSupportTickets:true
            }
        })
    }else{
        return await db.query.usersTable.findMany({
            columns: {
                created_at: false,
                updated_at: false
            }
        })
    }
}

export const addUserDetails=async(user: userInsert): Promise<string>=>{
        await db.insert(usersTable).values(user)
        return "User added successfully"
}

export const deletUsersDetails=async(id: number): Promise<string>=>{
        await db.delete(usersTable).where(eq(usersTable.id, id ))
        return "User deleted successfully"
}

export const updateUserDetails=async(id: number, user: Partial<userInsert>): Promise<string>=>{
        await db.update(usersTable).set(user).where(eq(usersTable.id, id ))
        return "User updated successfully"
    }
