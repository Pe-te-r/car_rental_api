import { Context } from "hono";
import * as bcrypt from "bcrypt";
import {  checkResetCode, deleteUserFailed, insertResetCode, registerUser, storePassword, updatePassword, userExists } from "./auth.services";
import {  sign} from "hono/jwt"
import { loginReturnData } from "../types/types";
import { sendMail } from "../send_mail/SendMail";
import { updateUserDetails } from "../users/users.services";

// login
export const loginController=async(c: Context)=>{
    const userDetails = await c.req.json()
    console.log(userDetails)
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
        exp:Math.floor(Date.now()/1000)+(60*270)
      }

    const secret=process.env.SECRET_KEY as string
    const token= await sign(payload, secret)
    
    // login return object
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
        console.log(newUser)
        const userExist =await userExists(newUser.email)
        if(userExist){
            return c.json({"error":"Email already exists"},400)
        }
        console.log(userExist)
        console.log('here')
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
            try {
                sendMail('register',newUser.email,"car rental registration",newUser.name)
                return c.json({'username':newUser.name})
            } catch (error) {
                return c.json('email not sent but logined well')
            }
        }else{
            await deleteUserFailed(Number(userId[0]['id']))
            return c.json({"error":"error occured while creating the user"},400)
        }
        
    } catch (error: any) {
        return c.json({'error':error?.message})
    }
}


export const sendCode =async(c: Context)=>{
    // generate code
    const {email} =await c.req.json()
    const userExist = await userExists(email)
    console.log(userExist)
    if(!userExist) return c.json({'error': 'User not found'})
    const code = Math.floor(1000 + Math.random() * 9000)
    console.log(code)
    console.log('code:')
    // store code in database
    const stored =await insertResetCode(String(code),userExist.id)
    console.log(stored)
    console.log('here')
    if(stored !== undefined){
        sendMail('reset',email,'reset password',userExist.name,String(code))
        return c.json({"message":"success"})
    }else{
        return c.json({"error":"error occured while sending the code"})
    }
}

export const changeInfo=async(c: Context)=>{
    const newDetails= await c.req.json()
    console.log(newDetails)
    const id = newDetails.user_id
    console.log(id)
    const code = newDetails.code
    // check if code matches
    const codeExist = await checkResetCode(code,id)
    console.log(codeExist)
    if(!codeExist) return c.json({'error': 'Invalid'})
    delete newDetails.code
    // update passsword
    const password = newDetails?.password
    if(password){
        const saltRounds = 10;
        const hashedPassword =await bcrypt.hash(password,saltRounds)
        const updatePasswordResults = await updatePassword(hashedPassword,id)
        if(updatePasswordResults !== 'success'){
            return c.json({"error":"cannot update"})
        }
    }

    // update user details
    const newUser ={
        name: newDetails.name,
        email: newDetails.email,
        contact_phone: newDetails.contact_phone
    }
    const updated = await updateUserDetails(id,newUser)
    if(updated == 'updated'){
        return c.json({"message":"success"})
    }else{
        return c.json({"error":"error occured while updating the user"})
    }
}