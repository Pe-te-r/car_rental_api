"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFailed = exports.userExists = exports.storePassword = exports.registerUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// register
const registerUser = async (user) => {
    try {
        return await db_1.default.insert(schema_1.usersTable).values(user).returning({ id: schema_1.usersTable.id, email: schema_1.usersTable.email }).execute();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.registerUser = registerUser;
// store password
const storePassword = async (passwrod, id) => {
    try {
        await db_1.default.insert(schema_1.authenicationTable).values({ password: passwrod, user_id: id });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.storePassword = storePassword;
// userExists
const userExists = async (email) => {
    return await db_1.default.query.usersTable.findFirst({
        where: ((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email)),
        with: {
            authentication: {
                columns: { password: true }
            }
        }
    });
};
exports.userExists = userExists;
const deleteUserFailed = async (id) => {
    await db_1.default.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
};
exports.deleteUserFailed = deleteUserFailed;
