"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpectDetailOne = exports.getSpectDetails = exports.updateSpectDetails = exports.deleteSpectDetails = exports.createSpectDetails = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createSpectDetails = async (spects) => {
    await db_1.default.insert(schema_1.vehicle_specsTable).values(spects);
    return 'success';
};
exports.createSpectDetails = createSpectDetails;
const deleteSpectDetails = async (id) => {
    await db_1.default.delete(schema_1.vehicle_specsTable).where((0, drizzle_orm_1.eq)(schema_1.vehicle_specsTable.vehicle_specsTable_id, id));
    return "spects deleted successfully";
};
exports.deleteSpectDetails = deleteSpectDetails;
const updateSpectDetails = async (id, spects) => {
    await db_1.default.update(schema_1.vehicle_specsTable).set(spects).where((0, drizzle_orm_1.eq)(schema_1.vehicle_specsTable.vehicle_specsTable_id, id));
    return "success";
};
exports.updateSpectDetails = updateSpectDetails;
const getSpectDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.vehicle_specsTable.findMany({
            limit: limit,
            with: {
                vehicle: true,
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.vehicle_specsTable.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.vehicle_specsTable.findMany({
            with: {
                vehicle: true,
            }
        });
    }
    else {
        return await db_1.default.query.vehicle_specsTable.findMany();
    }
};
exports.getSpectDetails = getSpectDetails;
const getSpectDetailOne = async (id, details) => {
    if (details) {
        return await db_1.default.query.vehicle_specsTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.vehicle_specsTable.vehicle_specsTable_id, id),
            with: {
                vehicle: true,
            }
        });
    }
    else {
        return await db_1.default.query.vehicle_specsTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.vehicle_specsTable.vehicle_specsTable_id, id),
        });
    }
};
exports.getSpectDetailOne = getSpectDetailOne;
