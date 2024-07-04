import { Hono } from "hono";
import { loginController, registerController } from "./auth.controller";

const authRoute = new Hono()

authRoute.post('/login', loginController)
authRoute.post('/register', registerController)