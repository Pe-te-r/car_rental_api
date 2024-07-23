"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const bcrypt = require("bcrypt");
const auth_services_1 = require("./auth.services");
const jwt_1 = require("hono/jwt");
const SendMail_1 = require("../send_mail/SendMail");
// login
const loginController = async (c) => {
    const userDetails = await c.req.json();
    console.log(userDetails);
    const userExist = await (0, auth_services_1.userExists)(userDetails.email);
    console.log(userExist);
    if (!userExist) {
        return c.json({ "error": "User not found" }, 401);
    }
    const passwordMatch = await bcrypt.compare(userDetails.password, userExist.authentication?.password);
    if (!passwordMatch) {
        return c.json({ "error": "Invalid credentials" }, 401);
    }
    const payload = {
        user_id: userExist.id,
        role: userExist.role,
        email: userExist.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 270)
    };
    const secret = process.env.SECRET_KEY;
    const token = await (0, jwt_1.sign)(payload, secret);
    // login return object
    const returnData = {
        id: userExist.id,
        name: userExist.name,
        email: userExist?.email,
        role: userExist.role,
        contact_phone: userExist.contact_phone,
        token: token,
    };
    console.log(returnData);
    return c.json(returnData);
};
exports.loginController = loginController;
// register
const registerController = async (c) => {
    try {
        const newUser = await c.req.json();
        // check if user is already registered
        console.log(newUser);
        const userExist = await (0, auth_services_1.userExists)(newUser.email);
        if (userExist) {
            return c.json({ "error": "Email already exists" }, 400);
        }
        console.log(userExist);
        console.log('here');
        // hash the password.
        const password = newUser.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // delete the old password and store user details
        delete newUser.password;
        const userId = await (0, auth_services_1.registerUser)(newUser);
        if (!userId) {
            return c.json({ "error": "User registration failed" }, 400);
        }
        const storedPass = await (0, auth_services_1.storePassword)(hashedPassword.toString(), Number(userId[0]['id']));
        if (storedPass) {
            try {
                (0, SendMail_1.sendMail)('register', newUser.email, "car rental registration", newUser.name);
                return c.json({ 'username': newUser.name });
            }
            catch (error) {
                return c.json('email not sent but logined well');
            }
        }
        else {
            await (0, auth_services_1.deleteUserFailed)(Number(userId[0]['id']));
            return c.json({ "error": "error occured while creating the user" }, 400);
        }
    }
    catch (error) {
        return c.json({ 'error': error?.message });
    }
};
exports.registerController = registerController;
