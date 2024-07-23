"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFleet = exports.getFleet = exports.updateFleet = exports.deleteFleet = exports.createFleet = void 0;
const fleet_services_1 = require("./fleet.services");
const createFleet = async (c) => {
    try {
        const fleet = await c.req.json();
        const result = await (0, fleet_services_1.createFleetDetails)(fleet);
        return c.json({ "result": result }, 201);
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.createFleet = createFleet;
const deleteFleet = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const result = await (0, fleet_services_1.deleteFleetDetails)(Number(id));
        return c.json({ "result": result }, 204);
    }
    catch (error) {
        return c.json({ "error": error.message }, 500);
    }
};
exports.deleteFleet = deleteFleet;
const updateFleet = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const fleet = await c.req.json();
        const result = await (0, fleet_services_1.updateFleetDetails)(Number(id), fleet);
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.updateFleet = updateFleet;
const getFleet = async (c) => {
    try {
        const query = c.req.query();
        const limit = Number(query.limit);
        const details = true;
        const results = await (0, fleet_services_1.getFleetDetails)(Number(limit), Boolean(details));
        return c.json({ "results": results }, 200);
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.getFleet = getFleet;
const getOneFleet = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const query = c.req.query();
        const details = query['details'];
        const result = await (0, fleet_services_1.getOneFleetDetails)(Number(id), Boolean(details));
        if (!result)
            return c.json({ "error": "No vehicle found with this id" });
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": error.message }, 500);
    }
};
exports.getOneFleet = getOneFleet;
