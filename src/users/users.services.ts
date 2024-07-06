import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { UserSelect, userInsert, usersTable } from "../drizzle/schema"
// import { userTypeReturn } from "../types/types"

export const getOneUserDetails = async (id: number): Promise<UserSelect | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

export const addUserDetails=async(user: userInsert): Promise<string>=>{
        await db.insert(usersTable).values(user)
        return "User added successfully"
}

export const deletUsersDetails=async(id: number): Promise<string>=>{
    try {
        await db.delete(usersTable).where(eq(usersTable.id, id ))
        return "User deleted successfully"
    } catch (error: any) {
        return error?.message
    }
}

export const updateUserDetails=async(id: number, user: Partial<userInsert>): Promise<string>=>{
        await db.update(usersTable).set(user).where(eq(usersTable.id, id ))
        return "User updated successfully"
    }
