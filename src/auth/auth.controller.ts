import { Context } from "hono";
import * as bcrypt from "bcrypt";
import {  deleteUserFailed, registerUser, storePassword, userExists } from "./auth.services";
import {  sign} from "hono/jwt"
import { loginReturnData } from "../types/types";
import { sendMail } from "../send_mail/SendMail";
import { deleteUser } from "../users/users.control";

// login
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
    const payload = {
        user_id:userExist.id,
        role:userExist.role,
        email:userExist.email,
        exp:Math.floor(Date.now()/1000)+(60*180)
      }
    const secret=process.env.SECRET_KEY as string
    const token= await sign(payload, secret)

    // login return obct
    const returnData: loginReturnData ={
        id:userExist.id,
        name:userExist.name,
        email:userExist?.email,
        role:userExist.role,
        contact_phone:userExist.contact_phone,
        token:token,
    }
    console.log(returnData)
    return c.json(returnData)
}
// register
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
        if(storedPass){
            sendMail('register',newUser.email,"car rental registration",newUser.name)
            return c.json({'username':newUser.name})
        }else{
            await deleteUserFailed(Number(userId[0]['id']))
            return c.json({"error":"error occured while creating the user"},400)
        }
        
    } catch (error: any) {
        return c.json({'error':error?.message})
        
    }
}