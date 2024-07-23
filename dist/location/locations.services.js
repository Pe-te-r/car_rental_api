"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneLocationDetails = exports.getLocationsDetails = exports.updateLocationsDetails = exports.deleteLocationsDetails = exports.createLocationsDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createLocationsDetails = async (locations) => {
    await db_1.default.insert(schema_1.locationTable).values(locations);
    return "success";
};
exports.createLocationsDetails = createLocationsDetails;
const deleteLocationsDetails = async (id) => {
    await db_1.default.delete(schema_1.locationTable).where((0, drizzle_orm_1.eq)(schema_1.locationTable.id, id));
    return "success";
};
exports.deleteLocationsDetails = deleteLocationsDetails;
const updateLocationsDetails = async (id, newDetails) => {
    await db_1.default.update(schema_1.locationTable).set(newDetails).where((0, drizzle_orm_1.eq)(schema_1.locationTable.id, id));
    return "success";
};
exports.updateLocationsDetails = updateLocationsDetails;
const getLocationsDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.locationTable.findMany({
            limit: limit,
            with: {
                vehicles: true,
            }
        });
    }
    else if (details) {
        return await db_1.default.query.locationTable.findMany({
            with: {
                vehicles: true,
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.locationTable.findMany({
            limit: limit,
        });
    }
    else {
        return await db_1.default.query.locationTable.findMany();
    }
};
exports.getLocationsDetails = getLocationsDetails;
const getOneLocationDetails = async (id, details) => {
    if (details) {
        return await db_1.default.query.locationTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.locationTable.id, id),
            with: {
                vehicles: true,
                bookings: true
            }
        });
    }
    else {
        return await db_1.default.query.locationTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.locationTable.id, id),
        });
    }
};
exports.getOneLocationDetails = getOneLocationDetails;
