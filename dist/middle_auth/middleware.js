"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoleAuth = exports.adminRoleAuth = exports.userRoleAuth = exports.allMiddleware = exports.authMiddleware = exports.verifyToken = void 0;
const jwt_1 = require("hono/jwt");
require("dotenv/config");
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const authMiddleware = async (c, next, role) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "unauthorized no token provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.SECRET_KEY);
    if (!decoded)
        return c.json({ error: "token not valid" });
    if (decoded.role !== role)
        return c.json({ msg: "you are unauthorized" }, 401);
    return next();
};
exports.authMiddleware = authMiddleware;
const allMiddleware = async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "unauthorized no token provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.SECRET_KEY);
    if (!decoded)
        return c.json({ error: token });
    return next();
};
exports.allMiddleware = allMiddleware;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const allRoleAuth = async (c, next) => await (0, exports.allMiddleware)(c, next);
exports.allRoleAuth = allRoleAuth;
