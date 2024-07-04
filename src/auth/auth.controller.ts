import { Context } from "hono";

export const loginController=async(c: Context)=>{

    return c.json({'username':'peter'})
}
export const registerController=async(c: Context)=>{
    const newUser = await c.req.json()
    return c.json({'username':newUser})
}