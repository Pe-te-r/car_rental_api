import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { UserSelect, userInsert, usersTable } from "../drizzle/schema"


export const getOneUserDetails = async (id: number): Promise<UserSelect | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with:{
            bookings: true,
            customerSupportTickets:true
        }
    })
}

export const getAllUserDetails=async(limit:number,details:boolean):Promise<UserSelect[] | null> => {
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
    }else{
        return await db.query.usersTable.findMany()
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
