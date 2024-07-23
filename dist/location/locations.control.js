"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneLocation = exports.getLocations = exports.updateLocation = exports.deleteLocation = exports.createLocation = void 0;
const locations_services_1 = require("./locations.services");
const createLocation = async (c) => {
    try {
        const newLocation = await c.req.json();
        const result = await (0, locations_services_1.createLocationsDetails)(newLocation);
        return c.json({ result: result }, 201);
    }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
};
exports.createLocation = createLocation;
const deleteLocation = async (c) => {
    try {
        const id = c.req.param('id');
        console.log(id);
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const result = await (0, locations_services_1.deleteLocationsDetails)(Number(id));
        return c.json({ result: result }, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
};
exports.deleteLocation = deleteLocation;
const updateLocation = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const newDetails = await c.req.json();
        const result = await (0, locations_services_1.updateLocationsDetails)(Number(id), newDetails);
        return c.json({ result: result });
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.updateLocation = updateLocation;
const getLocations = async (c) => {
    try {
        const query = c.req.query();
        const limit = query['limit'];
        const details = query['details'];
        const results = await (0, locations_services_1.getLocationsDetails)(Number(limit), Boolean(details));
        if (results === null)
            return c.json({ error: "No locations found" });
        return c.json({ results: results });
    }
    catch (error) {
        return c.json({ error: error.message });
    }
};
exports.getLocations = getLocations;
const getOneLocation = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const query = c.req.query();
        const details = query['details'];
        const result = await (0, locations_services_1.getOneLocationDetails)(Number(id), Boolean(details));
        if (!result)
            return c.json({ 'message': "nothing found" });
        return c.json({ results: result });
    }
    catch (error) {
        return c.json({ error: error.message });
    }
};
exports.getOneLocation = getOneLocation;
