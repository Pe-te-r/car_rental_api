import { Context } from "hono";
import * as bcrypt from "bcrypt";
import {  registerUser, storePassword, userExists } from "./auth.services";

export const loginController=async(c: Context)=>{
    const userDetails = await c.req.json()
    const userExist = await userExists(userDetails.email)
    console.log(userExist)
    if(!userExist){
        return c.json({"error":"User not found"},401)
    }
    const passwordMatch = await bcrypt.compare(userDetails.password, userExist.authentication?.password as string)
    if(!passwordMatch){
        return c.json({"error":"Invalid credentials"},401)
    }
    return c.json({"success":"login successful"},401)
}
export const registerController=async(c: Context)=>{
    try {
        const newUser = await c.req.json()
    
        // check if user is already registered
        const userExist =await userExists(newUser.email)
        if(userExist){
            return c.json({"error":"Email already exists"},400)
        }
        // hash the password.
        const password = newUser.password
        const saltRounds = 10;
        const hashedPassword =await bcrypt.hash(password,saltRounds)
        // delete the old password and store user details
        delete newUser.password
        const userId=await registerUser(newUser)
        
        if(!userId){
            return c.json({"error":"User registration failed"},400)
        }
        const storedPass = await storePassword(hashedPassword.toString(),Number(userId[0]['id']))
        console.log(storedPass)
        if(storedPass){
            
            return c.json({'username':newUser.name})
        }else{
            return c.json({"error":"Password storing failed"},400)
        }
        
    } catch (error: any) {
        return c.json({'error':error?.message})
        
    }
}