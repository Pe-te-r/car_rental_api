import { Hono } from "hono";
import { loginController, registerController } from "./auth.controller";
import { zValidator } from "@hono/zod-validator";
import { userLogin, userRegister } from "../validators";

export const authRoute = new Hono()

authRoute.post('/login',zValidator('json',userLogin,(result,c)=>{
    if(!result.success)return c.json(result.error,400)
}),  loginController)
authRoute.post('/register', zValidator('json', userRegister, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerController)