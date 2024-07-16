import { eq } from "drizzle-orm";
import db from "../drizzle/db"
import { UserSelect, authenicationTable, userInsert, usersTable } from "../drizzle/schema"


type TRIUser = Array<{ id: number }>;
// register
export const registerUser=async(user: userInsert): Promise<TRIUser  | undefined>=>{
    try {
        return await db.insert(usersTable).values(user).returning({ id: usersTable.id,email:usersTable.email }).execute();
        
    } catch (error:any) {
        console.log(error.message);
    }
     
}
// store password
export const storePassword = async(passwrod: string,id: number): Promise<boolean>=>{
    try{
        await db.insert(authenicationTable).values({password:passwrod,user_id:id});
        return true
    }catch(error){
        console.error(error)
        return false
    }
}
// userExists
export const userExists = async(email: string)=>{
    return await db.query.usersTable.findFirst({
        where:(eq(usersTable.email,email)),
        with: {
            authentication:{
                columns:{password: true}
            }
        }
    })
}


export const deleteUserFailed=async(id: number)=>{
    await db.delete(usersTable).where(eq(usersTable.id,id))
}