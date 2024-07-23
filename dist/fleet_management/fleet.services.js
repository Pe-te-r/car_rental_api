"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneFleetDetails = exports.getFleetDetails = exports.updateFleetDetails = exports.deleteFleetDetails = exports.createFleetDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createFleetDetails = async (fleet) => {
    await db_1.default.insert(schema_1.fleetManagamentTable).values(fleet);
    return "Fleet created successfully";
};
exports.createFleetDetails = createFleetDetails;
const deleteFleetDetails = async (id) => {
    await db_1.default.delete(schema_1.fleetManagamentTable).where((0, drizzle_orm_1.eq)(schema_1.fleetManagamentTable.id, id));
    return "Fleet deleted successfully";
};
exports.deleteFleetDetails = deleteFleetDetails;
const updateFleetDetails = async (id, details) => {
    await db_1.default.update(schema_1.fleetManagamentTable).set(details).where((0, drizzle_orm_1.eq)(schema_1.fleetManagamentTable.id, id));
    return "Fleet updated successfully";
};
exports.updateFleetDetails = updateFleetDetails;
const getFleetDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.fleetManagamentTable.findMany({
            limit: limit,
            with: {
                vehicle: true
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.fleetManagamentTable.findMany({ limit: limit });
    }
    else if (details) {
        return await db_1.default.query.fleetManagamentTable.findMany({
            with: {
                vehicle: {
                    columns: {
                        vehicle_id: true,
                    },
                    with: {
                        location: {
                            columns: {
                                name: true,
                            }
                        },
                        vehicleSpecification: {
                            columns: {
                                manufacturer: true,
                                model: true,
                                year: true
                            }
                        }
                    }
                }
            }
        });
    }
    else {
        return await db_1.default.query.fleetManagamentTable.findMany();
    }
};
exports.getFleetDetails = getFleetDetails;
const getOneFleetDetails = async (id, details) => {
    if (details) {
        return await db_1.default.query.fleetManagamentTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.fleetManagamentTable.id, id),
            with: {
                vehicle: {
                    columns: {
                        availability: true,
                    },
                    with: {
                        bookings: {
                            with: {
                                user: {
                                    columns: {
                                        name: true,
                                        email: true,
                                        contact_phone: true,
                                    }
                                },
                                payment: {
                                    columns: {
                                        payment_status: true,
                                    }
                                }
                            }
                        },
                        location: {
                            columns: {
                                name: true
                            }
                        },
                        vehicleSpecification: {
                            columns: {
                                manufacturer: true,
                                model: true,
                                year: true,
                                color: true,
                            }
                        }
                    }
                }
            }
        });
    }
    else {
        return await db_1.default.query.fleetManagamentTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.fleetManagamentTable.id, id) });
    }
};
exports.getOneFleetDetails = getOneFleetDetails;
