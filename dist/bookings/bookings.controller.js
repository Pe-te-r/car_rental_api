"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingSearch = exports.getOneBooking = exports.getAllBooking = exports.updateBooking = exports.deleteBooking = exports.createBooking = void 0;
const bookings_services_1 = require("./bookings.services");
// import { checkVehicleAvailability } from "./carAvailability";
const createBooking = async (c) => {
    try {
        const booking = await c.req.json();
        const result = await (0, bookings_services_1.createBookingDetails)(booking);
        const bookingId = result[0]['id'];
        return c.json({ id: bookingId });
    }
    catch (error) {
        return c.json({ error: error.message });
    }
};
exports.createBooking = createBooking;
const deleteBooking = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const result = await (0, bookings_services_1.deleteBookingDetails)(Number(id));
        return c.json({ "result": result }, 204);
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.deleteBooking = deleteBooking;
const updateBooking = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const booking = await c.req.json();
        const result = await (0, bookings_services_1.updateBookingDetails)(Number(id), booking);
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.updateBooking = updateBooking;
const getAllBooking = async (c) => {
    try {
        const query = c.req.query();
        const limit = query['limit'];
        const details = query['details'];
        const result = await (0, bookings_services_1.getBookingDetails)(Number(limit), Boolean(details));
        return c.json({ "results": result }, 200);
    }
    catch (error) {
        return c.json({ "error": error.message });
    }
};
exports.getAllBooking = getAllBooking;
const getOneBooking = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ error: "Invalid id" });
        const query = c.req.query();
        const details = query['details'];
        const result = await (0, bookings_services_1.getBookingDetailsByUserId)(Number(id), Boolean(details));
        if (!result)
            return c.json({ "error": "No booking found with this id" });
        return c.json({ "results": result });
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.getOneBooking = getOneBooking;
const getBookingSearch = async (c) => {
    try {
        const vehicle_id = c.req.param('id');
        const result = await (0, bookings_services_1.getBookingSearchResults)(Number(vehicle_id));
        return c.json({ "results": result });
    }
    catch (error) {
        console.error(error?.message);
    }
};
exports.getBookingSearch = getBookingSearch;
