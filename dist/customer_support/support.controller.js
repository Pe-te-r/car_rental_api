"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneSupport = exports.getSupport = exports.updateSupport = exports.deleteSupport = exports.createSupport = void 0;
const support_service_1 = require("./support.service");
const createSupport = async (c) => {
    try {
        const support = await c.req.json();
        console.log(support);
        const results = await (0, support_service_1.createSupportDetail)(support);
        console.log(results);
        return c.json({ "results": results }, 200);
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.createSupport = createSupport;
const deleteSupport = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const results = await (0, support_service_1.deleteSupportDetails)(Number(id));
        return c.json({ "results": results });
    }
    catch (error) {
        return c.json({ error: 'delete error' });
    }
};
exports.deleteSupport = deleteSupport;
const updateSupport = async (c) => {
    try {
        const id = c.req.param('id');
        console.log(id);
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const support = await c.req.json();
        console.log(support);
        const results = await (0, support_service_1.updateSupportDetails)(Number(id), support);
        return c.json({ "results": results });
    }
    catch (error) {
        return c.json({ error: 'update error' });
    }
};
exports.updateSupport = updateSupport;
const getSupport = async (c) => {
    try {
        const query = c.req.query();
        const limit = Number(query.limit);
        const details = query['details'];
        const results = await (0, support_service_1.getSupportDetails)(Number(limit), Boolean(details));
        return c.json({ "results": results });
    }
    catch (error) {
        return c.json({ "error": 'error' });
    }
};
exports.getSupport = getSupport;
const getOneSupport = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "error": "Invalid id" });
        const query = c.req.query();
        const details = query['details'];
        console.log(details);
        const result = await (0, support_service_1.getOneSupportDetails)(Number(id), Boolean(details));
        if (!result)
            return c.json({ "error": "No support service found with this id" });
        return c.json({ "results": result });
    }
    catch (error) {
        return c.json({ "error": 'error' });
    }
};
exports.getOneSupport = getOneSupport;
