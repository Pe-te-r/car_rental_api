"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.deletUsersDetails = exports.addUserDetails = exports.getAllUserDetails = exports.getOneUserDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// import { UserDetails } from "../types/types"
const getOneUserDetails = async (id, details) => {
    if (details) {
        return await db_1.default.query.usersTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.usersTable.id, id),
            columns: {
                role: true,
                id: true,
                contact_phone: true,
                email: true,
                name: true,
            },
            with: {
                bookings: {
                    with: {
                        vehicle: {
                            columns: {
                                availability: true,
                                vehicle_id: true,
                            },
                            with: {
                                vehicleSpecification: {
                                    columns: {
                                        model: true,
                                        color: true,
                                        fuel_type: true,
                                        manufacturer: true,
                                        engine_capacity: true,
                                        seating_capacity: true,
                                    }
                                },
                                location: {
                                    columns: {
                                        name: true,
                                        address: true,
                                        contact: true,
                                    }
                                }
                            }
                        }
                    },
                    columns: {
                        // location_id: true,
                        booking_date: true,
                        // vehicle_id:true,
                        totalAmount: true,
                        // id: true,
                        return_date: true,
                        status: true,
                    }
                },
                customerSupportTickets: {
                    columns: {
                        description: true,
                        status: true,
                        subject: true,
                        id: true,
                    }
                }
            }
        });
    }
    else {
        return await db_1.default.query.usersTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.usersTable.id, id),
            columns: {
                role: true,
                id: true,
                contact_phone: true,
                email: true,
                name: true,
            }
        });
    }
};
exports.getOneUserDetails = getOneUserDetails;
const getAllUserDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.usersTable.findMany({
            limit: limit,
            with: {
                bookings: true,
                customerSupportTickets: true
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.usersTable.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.usersTable.findMany({
            with: {
                bookings: true,
                customerSupportTickets: true
            }
        });
    }
    else {
        return await db_1.default.query.usersTable.findMany({
            columns: {
                created_at: false,
                updated_at: false
            }
        });
    }
};
exports.getAllUserDetails = getAllUserDetails;
const addUserDetails = async (user) => {
    await db_1.default.insert(schema_1.usersTable).values(user);
    return "added";
};
exports.addUserDetails = addUserDetails;
const deletUsersDetails = async (id) => {
    await db_1.default.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return "deleted";
};
exports.deletUsersDetails = deletUsersDetails;
const updateUserDetails = async (id, user) => {
    await db_1.default.update(schema_1.usersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return "updated";
};
exports.updateUserDetails = updateUserDetails;
