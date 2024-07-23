"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const auth_route_1 = require("./auth/auth.route");
const vehicles_route_1 = require("./vehicles/vehicles.route");
const spects_route_1 = require("./vehicle_spects/spects.route");
const locations_route_1 = require("./location/locations.route");
const users_route_1 = require("./users/users.route");
const fleet_route_1 = require("./fleet_management/fleet.route");
const support_route_1 = require("./customer_support/support.route");
const bookings_route_1 = require("./bookings/bookings.route");
const payments_route_1 = require("./payments/payments.route");
const app = new hono_1.Hono();
app.use((0, cors_1.cors)({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
}));
app.route('/api', auth_route_1.authRoute);
app.route('/api', users_route_1.usersRoute);
app.route('/api', vehicles_route_1.vehicleRoute);
app.route('/api', spects_route_1.VehicleSpectsRoute);
app.route('/api', locations_route_1.locationRoute);
app.route('/api', vehicles_route_1.vehicleRoute);
app.route('/api', fleet_route_1.fleetRoute);
app.route('/api', support_route_1.supportRoute);
app.route('/api', bookings_route_1.bookingRoute);
app.route('/api', payments_route_1.paymentRoute);
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
