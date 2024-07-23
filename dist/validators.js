"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const zod_1 = require("zod");
exports.userRegister = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    contact_phone: zod_1.z.string(),
    role: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    password: zod_1.z.string()
});
exports.userLogin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
