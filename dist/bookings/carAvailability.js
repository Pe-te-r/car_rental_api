"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVehicleAvailability = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const checkVehicleAvailability = async (id) => {
    return await db_1.default.query.vehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id),
        columns: {
            availability: true,
        }
    });
};
exports.checkVehicleAvailability = checkVehicleAvailability;
