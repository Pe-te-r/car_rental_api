"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const hono_1 = require("hono");
const auth_controller_1 = require("./auth.controller");
// import { zValidator } from "@hono/zod-validator";
// import { userLogin, userRegister } from "../validators";
exports.authRoute = new hono_1.Hono();
exports.authRoute.post('/login', auth_controller_1.loginController);
exports.authRoute.post('/register', auth_controller_1.registerController);
exports.authRoute.post('/code', auth_controller_1.sendCode);
exports.authRoute.put('/change', auth_controller_1.changeInfo);
// zValidator('json',userLogin,(result,c)=>{
//     if(!result.success)return c.json(result.error,400)
// }), 
// zValidator('json', userRegister, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }),
