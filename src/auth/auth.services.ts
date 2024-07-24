import { eq } from "drizzle-orm";
import db from "../drizzle/db"
import { UserSelect, authenicationTable, resetCode, userInsert, usersTable } from "../drizzle/schema"


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



export const insertResetCode = async (code: string, id: number): Promise<{ id: number }[] | undefined> => {
    return await db.transaction(async (tx) => {
      // Delete existing reset code for the user
      await tx.delete(resetCode).where(eq(resetCode.user_id, id));
  
      // Insert new reset code
      const result = await tx.insert(resetCode)
        .values({ code: code, user_id: id })
        .returning({ id: resetCode.user_id });
  
      return result;
    });
  }

  export const checkResetCode = async (code: string, id: number): Promise<boolean> => {
    const resetCodeExists = await db.query.resetCode.findFirst({
      where: (resetCode, { eq, and }) => and(
        eq(resetCode.user_id, id),
        eq(resetCode.code, code)
      ),
    });
  
    return resetCodeExists !== undefined;
  }

  export const updatePassword = async(password: string,id: number): Promise<string>=>{
    await db.update(authenicationTable).set({password: password}).where(eq(usersTable.id, id))
    return "success"
}