"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getAllUser = exports.getUser = void 0;
const users_services_1 = require("./users.services");
const middleware_1 = require("../middle_auth/middleware");
const getUser = async (c) => {
    const id = c.req.param('id');
    const token = c.req.header("Authorization");
    const decoded = await (0, middleware_1.verifyToken)(token, process.env.SECRET_KEY);
    if (isNaN(Number(id)))
        return c.json({ "message": "insert a valid id" });
    if (Number(decoded?.user_id) !== Number(id) || !decoded)
        return c.json({ msg: "cannot get another user details" });
    const result = await (0, users_services_1.getOneUserDetails)(Number(id));
    if (result === undefined)
        return c.json({ "message": `no such user with id ${id}` });
    return c.json({ "results": result });
};
exports.getUser = getUser;
const getAllUser = async (c) => {
    try {
        const query = c.req.query();
        const limt = query['limit'];
        const details = query['details'];
        const result = await (0, users_services_1.getAllUserDetails)(Number(limt), Boolean(details));
        if (result === null)
            return c.json({ "message": "no user available" });
        return c.json(result);
    }
    catch (error) {
        return c.json({ "message": "error occured" });
    }
};
exports.getAllUser = getAllUser;
// controller for adding a user
const addUser = async (c) => {
    try {
        const details = await c.req.json();
        const results = await (0, users_services_1.addUserDetails)(details);
        return c.json({ 'message': results }, 201);
    }
    catch (error) {
        return c.json({ 'message': "Error adding user" });
    }
};
exports.addUser = addUser;
// controller for update a user
const updateUser = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "message": "insert a valid id" });
        const token = c.req.header("Authorization");
        const decoded = await (0, middleware_1.verifyToken)(token, process.env.SECRET_KEY);
        if (Number(decoded?.user_id) !== Number(id) && decoded?.role != 'admin')
            return c.json({ "msg": "cannot update this details" });
        const newDetails = await c.req.json();
        const results = await (0, users_services_1.updateUserDetails)(Number(id), newDetails);
        return c.json({ 'message': results });
    }
    catch (error) {
        return c.json({ 'message': "error updating the user details" });
    }
};
exports.updateUser = updateUser;
// controller for updating user details
const deleteUser = async (c) => {
    try {
        const id = c.req.param('id');
        const token = c.req.header("Authorization");
        const decoded = await (0, middleware_1.verifyToken)(token, process.env.SECRET_KEY);
        console.log(decoded);
        if (isNaN(Number(id)))
            return c.json({ "message": "insert a valid id" });
        if (decoded?.user_id !== id && decoded?.role != 'admin')
            return c.json({ "msg": "cannot update this details" });
        const results = await (0, users_services_1.deletUsersDetails)(Number(id));
        // console.log(results)
        return c.json({ 'message': results });
    }
    catch (error) {
        return c.json({ "message": "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
