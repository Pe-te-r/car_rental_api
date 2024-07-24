import { Hono } from "hono";
import { changeInfo, loginController, registerController, sendCode } from "./auth.controller";
// import { zValidator } from "@hono/zod-validator";
// import { userLogin, userRegister } from "../validators";

export const authRoute = new Hono()

authRoute.post('/login', loginController)
authRoute.post('/register',  registerController)
authRoute.post('/code', sendCode)
authRoute.put('/change',changeInfo)





// zValidator('json',userLogin,(result,c)=>{
//     if(!result.success)return c.json(result.error,400)
// }), 

// zValidator('json', userRegister, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }),