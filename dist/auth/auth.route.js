"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const hono_1 = require("hono");
const auth_controller_1 = require("./auth.controller");
exports.authRoute = new hono_1.Hono();
exports.authRoute.post('/login', auth_controller_1.loginController);
exports.authRoute.post('/register', auth_controller_1.registerController);
// zValidator('json',userLogin,(result,c)=>{
//     if(!result.success)return c.json(result.error,400)
// }), 
// zValidator('json', userRegister, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }),
