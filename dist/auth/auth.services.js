"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.checkResetCode = exports.insertResetCode = exports.deleteUserFailed = exports.userExists = exports.storePassword = exports.registerUser = void 0;
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
const insertResetCode = async (code, id) => {
    return await db_1.default.transaction(async (tx) => {
        // Delete existing reset code for the user
        await tx.delete(schema_1.resetCode).where((0, drizzle_orm_1.eq)(schema_1.resetCode.user_id, id));
        // Insert new reset code
        const result = await tx.insert(schema_1.resetCode)
            .values({ code: code, user_id: id })
            .returning({ id: schema_1.resetCode.user_id });
        return result;
    });
};
exports.insertResetCode = insertResetCode;
const checkResetCode = async (code, id) => {
    const resetCodeExists = await db_1.default.query.resetCode.findFirst({
        where: (resetCode, { eq, and }) => and(eq(resetCode.user_id, id), eq(resetCode.code, code)),
    });
    return resetCodeExists !== undefined;
};
exports.checkResetCode = checkResetCode;
const updatePassword = async (password, id) => {
    await db_1.default.update(schema_1.authenicationTable).set({ password: password }).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return "success";
};
exports.updatePassword = updatePassword;
