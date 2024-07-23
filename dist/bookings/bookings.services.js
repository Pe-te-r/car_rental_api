"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingSearchResults = exports.getBookingDetailsByUserId = exports.getBookingDetails = exports.updateBookingDetails = exports.deleteBookingDetails = exports.createBookingDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createBookingDetails = async (details) => {
    return await db_1.default.insert(schema_1.bookingTable).values(details).returning({ id: schema_1.bookingTable.id }).execute();
};
exports.createBookingDetails = createBookingDetails;
const deleteBookingDetails = async (id) => {
    await db_1.default.delete(schema_1.bookingTable).where((0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id));
    return "Booking deleted successfully";
};
exports.deleteBookingDetails = deleteBookingDetails;
const updateBookingDetails = async (id, details) => {
    await db_1.default.update(schema_1.bookingTable).set(details).where((0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id));
    return "Booking updated successfully";
};
exports.updateBookingDetails = updateBookingDetails;
const getBookingDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.bookingTable.findMany({
            limit: limit,
            with: {
                user: true,
                vehicle: true,
                location: true,
                payment: true
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.bookingTable.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.bookingTable.findMany({
            with: {
                user: {
                    columns: {
                        name: true,
                        email: true,
                        contact_phone: true,
                    }
                },
                vehicle: {
                    with: {
                        vehicleSpecification: {
                            columns: {
                                manufacturer: true,
                                model: true,
                            }
                        }
                    }
                },
                location: {
                    columns: {
                        name: true,
                        contact: true,
                    }
                },
                payment: {
                    columns: {
                        payment_status: true,
                    }
                }
            }
        });
    }
    else {
        return await db_1.default.query.bookingTable.findMany();
    }
};
exports.getBookingDetails = getBookingDetails;
const getBookingDetailsByUserId = async (id, details) => {
    if (details) {
        return await db_1.default.query.bookingTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id),
            with: {
                user: true,
                vehicle: true,
                location: true,
                payment: true
            }
        });
    }
    else {
        return await db_1.default.query.bookingTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id),
        });
    }
};
exports.getBookingDetailsByUserId = getBookingDetailsByUserId;
const getBookingSearchResults = async (id) => {
    return await db_1.default.query.bookingTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingTable.vehicle_id, id),
        columns: {
            booking_date: true,
            return_date: true,
        }
    });
};
exports.getBookingSearchResults = getBookingSearchResults;
