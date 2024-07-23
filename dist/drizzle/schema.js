"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagamentRelations = exports.locationRelations = exports.customer_supportRelations = exports.authenicationRelations = exports.paymentRelations = exports.bookingRelations = exports.vehicle_specsRelations = exports.vehiclesRelations = exports.usersRelations = exports.customer_support = exports.paymentTable = exports.paymentEnum = exports.bookingTable = exports.statusEnum = exports.locationTable = exports.fleetManagamentTable = exports.authenicationTable = exports.vehicle_specsTable = exports.vehiclesTable = exports.usersTable = exports.roleEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user"]);
exports.usersTable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    email: (0, pg_core_1.varchar)("email").unique(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone"),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.date)("created_at").notNull().default('now()'),
    updated_at: (0, pg_core_1.date)("updated_at")
});
exports.vehiclesTable = (0, pg_core_1.pgTable)('vehicles', {
    vehicle_id: (0, pg_core_1.serial)('id').primaryKey(),
    rental_rate: (0, pg_core_1.decimal)('rental_rate'),
    availability: (0, pg_core_1.boolean)('availability').notNull(),
    location_id: (0, pg_core_1.integer)('location_id').references(() => exports.locationTable.id, { onDelete: 'cascade' }),
});
exports.vehicle_specsTable = (0, pg_core_1.pgTable)('vehicle_specs', {
    vehicle_specsTable_id: (0, pg_core_1.integer)('id').references(() => exports.vehiclesTable.vehicle_id, { onDelete: 'cascade' }),
    manufacturer: (0, pg_core_1.varchar)('manufacturer').notNull(),
    model: (0, pg_core_1.varchar)('model').notNull(),
    year: (0, pg_core_1.varchar)('year'),
    fuel_type: (0, pg_core_1.varchar)('fuel_type').notNull(),
    engine_capacity: (0, pg_core_1.varchar)('engine_capacity').notNull(),
    transmission_capacity: (0, pg_core_1.varchar)('transmission_capacity'),
    color: (0, pg_core_1.varchar)('color'),
    seating_capacity: (0, pg_core_1.varchar)('seating_capacity').notNull(),
    features: (0, pg_core_1.varchar)('features')
});
exports.authenicationTable = (0, pg_core_1.pgTable)('authenication', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => exports.usersTable.id, { onDelete: 'cascade' }),
    password: (0, pg_core_1.varchar)('password').notNull(),
});
exports.fleetManagamentTable = (0, pg_core_1.pgTable)('fleet_table', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    vehicle_id: (0, pg_core_1.integer)('vehicle_id').references(() => exports.vehiclesTable.vehicle_id, { onDelete: 'cascade' }),
    acquisition_date: (0, pg_core_1.date)('acquisition_date'),
    depreciation_date: (0, pg_core_1.date)('depreciation_date'),
    maintances_cost: (0, pg_core_1.decimal)('maintances_cost'),
    status: (0, pg_core_1.varchar)('status')
});
exports.locationTable = (0, pg_core_1.pgTable)('locations', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    address: (0, pg_core_1.varchar)('address').notNull(),
    contact: (0, pg_core_1.varchar)('contact').notNull(),
});
exports.statusEnum = (0, pg_core_1.pgEnum)("rule", ["pending", "confirmed"]);
exports.bookingTable = (0, pg_core_1.pgTable)('bookings', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => exports.usersTable.id, { onDelete: 'cascade' }),
    vehicle_id: (0, pg_core_1.integer)('vehicle_id').references(() => exports.vehiclesTable.vehicle_id, { onDelete: 'cascade' }),
    location_id: (0, pg_core_1.integer)('location_id').references(() => exports.locationTable.id, { onDelete: 'cascade' }),
    booking_date: (0, pg_core_1.date)('booking_date').notNull(),
    return_date: (0, pg_core_1.date)('return_date').notNull(),
    totalAmount: (0, pg_core_1.varchar)('total_amount'),
    status: (0, exports.statusEnum)('status').default("pending")
});
exports.paymentEnum = (0, pg_core_1.pgEnum)("rule", ["pending", "confirmed"]);
exports.paymentTable = (0, pg_core_1.pgTable)('payment', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    booking_id: (0, pg_core_1.integer)('booking_id').references(() => exports.bookingTable.id, { onDelete: 'cascade' }),
    amount: (0, pg_core_1.decimal)('amount').notNull(),
    payment_status: (0, exports.paymentEnum)('payment_status').default('pending'),
    payment_date: (0, pg_core_1.date)('payment_date').notNull(),
    payment_method: (0, pg_core_1.varchar)('payment_method').notNull(),
    trasaction_id: (0, pg_core_1.varchar)('trasaction_id'),
});
exports.customer_support = (0, pg_core_1.pgTable)('customer_support', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    user_id: (0, pg_core_1.integer)('user_id').references(() => exports.usersTable.id, { onDelete: 'cascade' }),
    subject: (0, pg_core_1.varchar)('subject').notNull(),
    description: (0, pg_core_1.varchar)('description').notNull(),
    status: (0, pg_core_1.varchar)('status').default('pending'),
});
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ many, one }) => ({
    bookings: many(exports.bookingTable),
    customerSupportTickets: many(exports.customer_support),
    authentication: one(exports.authenicationTable),
}));
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.vehiclesTable, ({ one, many }) => ({
    vehicleSpecification: one(exports.vehicle_specsTable, {
        fields: [exports.vehiclesTable.vehicle_id],
        references: [exports.vehicle_specsTable.vehicle_specsTable_id],
    }),
    bookings: many(exports.bookingTable),
    fleetManagementRecords: many(exports.fleetManagamentTable),
    location: one(exports.locationTable, {
        fields: [exports.vehiclesTable.location_id],
        references: [exports.locationTable.id],
    }),
}));
exports.vehicle_specsRelations = (0, drizzle_orm_1.relations)(exports.vehicle_specsTable, ({ one }) => ({
    vehicle: one(exports.vehiclesTable),
}));
exports.bookingRelations = (0, drizzle_orm_1.relations)(exports.bookingTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.bookingTable.user_id],
        references: [exports.usersTable.id],
    }),
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.bookingTable.vehicle_id],
        references: [exports.vehiclesTable.vehicle_id],
    }),
    location: one(exports.locationTable, {
        fields: [exports.bookingTable.location_id],
        references: [exports.locationTable.id],
    }),
    payment: one(exports.paymentTable),
}));
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.paymentTable, ({ one }) => ({
    booking: one(exports.bookingTable, {
        fields: [exports.paymentTable.booking_id],
        references: [exports.bookingTable.id],
    }),
}));
exports.authenicationRelations = (0, drizzle_orm_1.relations)(exports.authenicationTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.authenicationTable.user_id],
        references: [exports.usersTable.id],
    }),
}));
exports.customer_supportRelations = (0, drizzle_orm_1.relations)(exports.customer_support, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.customer_support.user_id],
        references: [exports.usersTable.id],
    }),
}));
exports.locationRelations = (0, drizzle_orm_1.relations)(exports.locationTable, ({ many }) => ({
    bookings: many(exports.bookingTable),
    vehicles: many(exports.vehiclesTable),
}));
exports.fleetManagamentRelations = (0, drizzle_orm_1.relations)(exports.fleetManagamentTable, ({ one }) => ({
    vehicle: one(exports.vehiclesTable, {
        fields: [exports.fleetManagamentTable.vehicle_id],
        references: [exports.vehiclesTable.vehicle_id],
    }),
}));
