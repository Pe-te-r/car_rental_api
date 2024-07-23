"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneSupportDetails = exports.getSupportDetails = exports.updateSupportDetails = exports.deleteSupportDetails = exports.createSupportDetail = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const createSupportDetail = async (supportDetailsValue) => {
    await db_1.default.insert(schema_1.customer_support).values(supportDetailsValue);
    return 'success';
};
exports.createSupportDetail = createSupportDetail;
const deleteSupportDetails = async (id) => {
    await db_1.default.delete(schema_1.customer_support).where((0, drizzle_orm_1.eq)(schema_1.customer_support.id, id));
    return 'success';
};
exports.deleteSupportDetails = deleteSupportDetails;
const updateSupportDetails = async (id, supportDetailsValue) => {
    await db_1.default.update(schema_1.customer_support).set(supportDetailsValue).where((0, drizzle_orm_1.eq)(schema_1.customer_support.id, id));
    return 'success';
};
exports.updateSupportDetails = updateSupportDetails;
const getSupportDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.customer_support.findMany({
            limit: limit,
            with: {
                user: true,
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.customer_support.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.customer_support.findMany({
            with: {
                user: true,
            }
        });
    }
    else {
        return await db_1.default.query.customer_support.findMany();
    }
};
exports.getSupportDetails = getSupportDetails;
const getOneSupportDetails = async (id, details) => {
    if (details) {
        console.log('here');
        return await db_1.default.query.customer_support.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.customer_support.id, id),
            with: {
                user: true,
            }
        });
    }
    else {
        return await db_1.default.query.customer_support.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.customer_support.id, id),
        });
    }
};
exports.getOneSupportDetails = getOneSupportDetails;
