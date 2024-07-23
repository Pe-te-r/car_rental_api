"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpect = exports.getSpects = exports.deleteSpects = exports.updateSpects = exports.createSpects = void 0;
const spects_services_1 = require("./spects.services");
const createSpects = async (c) => {
    try {
        const spects = await c.req.json();
        const result = await (0, spects_services_1.createSpectDetails)(spects);
        return c.json({ "result": result }, 201);
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.createSpects = createSpects;
const updateSpects = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "message": "Invalid id" });
        const spects = await c.req.json();
        const result = await (0, spects_services_1.updateSpectDetails)(Number(id), spects);
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": "Error updating" });
    }
};
exports.updateSpects = updateSpects;
const deleteSpects = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "message": "Invalid id" });
        const result = await (0, spects_services_1.deleteSpectDetails)(Number(id));
        if (!result)
            return c.json({ "message": "not found" });
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": "Error deleting" });
    }
};
exports.deleteSpects = deleteSpects;
const getSpects = async (c) => {
    try {
        const query = c.req.query();
        const details = query['details'];
        const limit = query['limit'];
        const result = await (0, spects_services_1.getSpectDetails)(Number(limit), Boolean(details));
        if (!result)
            return c.json({ "error": "No vehicle found" });
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.getSpects = getSpects;
const getSpect = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "message": "Invalid id" });
        const query = c.req.query();
        const details = query['details'];
        const result = await (0, spects_services_1.getSpectDetailOne)(Number(id), Boolean(details));
        if (!result)
            return c.json({ "error": "No vehicle found with this id" });
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": "Error getting" });
    }
};
exports.getSpect = getSpect;
