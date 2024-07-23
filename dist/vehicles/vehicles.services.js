"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleDetail = exports.getVehicleDetails = exports.updateVehicleDetails = exports.deleteVehicleDetails = exports.createVehicleDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createVehicleDetails = async (vehicleDetails) => {
    const id = await db_1.default.insert(schema_1.vehiclesTable).values(vehicleDetails).returning({ id: schema_1.vehiclesTable.vehicle_id }).execute();
    if (id && id.length > 0 && id[0].id) {
        return [{ id: id[0].id }];
    }
    else {
        throw new Error("Failed to retrieve the inserted id");
    }
};
exports.createVehicleDetails = createVehicleDetails;
const deleteVehicleDetails = async (id) => {
    await db_1.default.delete(schema_1.vehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "success";
};
exports.deleteVehicleDetails = deleteVehicleDetails;
const updateVehicleDetails = async (id, vehicleDetails) => {
    await db_1.default.update(schema_1.vehiclesTable).set(vehicleDetails).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "success";
};
exports.updateVehicleDetails = updateVehicleDetails;
const getVehicleDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.vehiclesTable.findMany({
            limit: limit,
            columns: {
                availability: true,
                rental_rate: true,
                vehicle_id: true,
            },
            with: {
                // bookings: true,
                vehicleSpecification: {
                    columns: {
                        // model:true,
                        // color:true,
                        // fuel_type:true,
                        manufacturer: true,
                        // engine_capacity:true,
                        seating_capacity: true,
                    }
                },
                location: {
                    columns: {
                        name: true,
                        // address:true,
                        // contact:true
                    }
                }
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.vehiclesTable.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.vehiclesTable.findMany({
            columns: {
                // availability:true,
                // rental_rate:true,
                // vehicle_id:true,
                location_id: false,
            },
            with: {
                // bookings:{},
                vehicleSpecification: {
                    columns: {
                        model: true,
                        manufacturer: true,
                        seating_capacity: true,
                    }
                },
                location: {
                    columns: {
                        name: true,
                    },
                },
            }
        });
    }
    else {
        return await db_1.default.query.vehiclesTable.findMany();
    }
};
exports.getVehicleDetails = getVehicleDetails;
const getVehicleDetail = async (id, details) => {
    if (details) {
        return await db_1.default.query.vehiclesTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id),
            with: {
                bookings: {
                    columns: {
                        booking_date: true,
                        return_date: true,
                    }
                },
                vehicleSpecification: {
                    columns: {
                        vehicle_specsTable_id: false,
                    }
                },
                // fleetManagementRecords: true,
                location: true,
            }
        });
    }
    else {
        return await db_1.default.query.vehiclesTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id)
        });
    }
};
exports.getVehicleDetail = getVehicleDetail;
