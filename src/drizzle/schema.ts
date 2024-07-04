import { relations } from 'drizzle-orm';
import { pgTable, serial, decimal, integer, varchar, pgEnum, date, boolean } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const usersTable = pgTable('users', {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").unique(),
  contact_phone: varchar("contact_phone"),
  role: roleEnum("role").default("user"),
  created_at: date("created_at").notNull().default('now()'),
  updated_at: date("updated_at")
});

export const vehiclesTable = pgTable('vehicles', {
  vehicle_id: serial('id').primaryKey(),
  rental_rate: decimal('rental_rate'),
  availability: boolean('availability').notNull()
});

export const vehicle_specsTable = pgTable('vehicle_specs', {
  vehicle_specsTable_id: serial('id').primaryKey(),
  manufacturer: varchar('manufacturer').notNull(),
  model: varchar('model').notNull(),
  year: varchar('year'),
  fuel_type: varchar('fuel_type').notNull(),
  engine_capacity: varchar('engine_capacity').notNull(),
  transmission_capacity: varchar('transmission_capacity'),
  color: varchar('color'),
  seating_capacity: varchar('seating_capacity').notNull(),
  features: varchar('features')
});

export const authenicationTable = pgTable('authenication', {
  id: serial('id').primaryKey().notNull(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  password: varchar('password').notNull(),
});

export const fleetManagamentTable = pgTable('fleet_table', {
  id: serial('id').primaryKey().notNull(),
  vehicle_id: integer('vehicle_id').references(() => vehiclesTable.vehicle_id, { onDelete: 'cascade' }),
  acquisition_date: date('acquisition_date'),
  depreciation_date: date('depreciation_date'),
  maintances_cost: decimal('maintances_cost'),
  status: varchar('status')
});

export const locationTable = pgTable('locations', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  address: varchar('address').notNull(),
  contact: varchar('contact').notNull(),
});

export const statusEnum = pgEnum("rule", ["pending", "returned"]);

export const bookingTable = pgTable('bookings', {
  id: serial('id').primaryKey().notNull(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  vehicle_id: integer('vehicle_id').references(() => vehiclesTable.vehicle_id, { onDelete: 'cascade' }),
  location_id: integer('location_id').references(() => locationTable.id, { onDelete: 'cascade' }),
  booking_date: date('booking_date').notNull(),
  return_date: date('return_date').notNull(),
  totalAmount: varchar('total_amount'),
  status: statusEnum('status').default("pending")
});

export const paymentEnum = pgEnum("rule", ["pending", "returned"]);

export const paymentTable = pgTable('payment', {
  id: serial('id').primaryKey().notNull(),
  booking_id: integer('booking_id').references(() => bookingTable.id, { onDelete: 'cascade' }),
  amount: decimal('amount').notNull(),
  payment_status: paymentEnum('payment_status').default('pending'),
  payment_date: date('payment_date').notNull(),
  payment_method: varchar('payment_method').notNull(),
  trasaction_id: varchar('trasaction_id'),
});

export const customer_support = pgTable('customer_support', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  subject: varchar('subject').notNull(),
  description: varchar('description').notNull(),
  status: varchar('status').default('pending'),
});

// Relations
export const usersRelations = relations(usersTable, ({ many, one }) => ({
  bookings: many(bookingTable),
  customerSupportTickets: many(customer_support),
  authentication: one(authenicationTable),
})); 

export const vehiclesRelations = relations(vehiclesTable, ({ one, many }) => ({
  vehicleSpecification: one(vehicle_specsTable),
  bookings: many(bookingTable),
  fleetManagementRecords: many(fleetManagamentTable),
  // location: one(locationTable),
}));

export const vehicle_specsRelations = relations(vehicle_specsTable, ({ one }) => ({
  vehicle: one(vehiclesTable),
}));

export const bookingRelations = relations(bookingTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookingTable.user_id],
    references: [usersTable.id],
  }),
  vehicle: one(vehiclesTable, {
    fields: [bookingTable.vehicle_id],
    references: [vehiclesTable.vehicle_id],
  }),
  location: one(locationTable, {
    fields: [bookingTable.location_id],
    references: [locationTable.id],
  }),
  payment: one(paymentTable),
}));

export const paymentRelations = relations(paymentTable, ({ one }) => ({
  booking: one(bookingTable, {
    fields: [paymentTable.booking_id],
    references: [bookingTable.id],
  }),
})); 

export const authenicationRelations = relations(authenicationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [authenicationTable.user_id],
    references: [usersTable.id],
  }),
})); 

export const customer_supportRelations = relations(customer_support, ({ one }) => ({
  user: one(usersTable, {
    fields: [customer_support.user_id],
    references: [usersTable.id],
  }),
})); 

export const locationRelations = relations(locationTable, ({ many }) => ({
  bookings: many(bookingTable),
  vehicles: many(vehiclesTable),
})); 

export const fleetManagamentRelations = relations(fleetManagamentTable, ({ one }) => ({
  vehicle: one(vehiclesTable, {
    fields: [fleetManagamentTable.vehicle_id],
    references: [vehiclesTable.vehicle_id],
  }),
}));

// user table
export type UserSelect=typeof usersTable.$inferSelect
export type userInsert=typeof usersTable.$inferInsert

// vehicle table
export type VehicleSelect=typeof vehiclesTable.$inferSelect
export type vehicleInsert=typeof vehiclesTable.$inferInsert

// vehicle_specs table
export type vehicle_specsSelect=typeof vehicle_specsTable.$inferSelect
export type vehicle_specsInsert=typeof vehicle_specsTable.$inferInsert

// authenication table
export type authenicationSelect=typeof authenicationTable.$inferSelect
export type authenicationInsert=typeof authenicationTable.$inferInsert

// fleetManagament table
export type fleetManagamentSelect=typeof fleetManagamentTable.$inferSelect
export type fleetManagamentInsert=typeof fleetManagamentTable.$inferInsert

// location table
export type locationSelect=typeof locationTable.$inferSelect
export type locationInsert=typeof locationTable.$inferInsert

// booking table
export type bookingSelect=typeof bookingTable.$inferSelect
export type bookingInsert=typeof bookingTable.$inferInsert

// payment table
export type paymentSelect=typeof paymentTable.$inferSelect
export type paymentInsert=typeof paymentTable.$inferInsert

// customer_support table
export type customer_supportSelect=typeof customer_support.$inferSelect
export type customer_supportInsert=typeof customer_support.$inferInsert
