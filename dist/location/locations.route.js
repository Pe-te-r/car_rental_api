"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoute = void 0;
const hono_1 = require("hono");
const locations_control_1 = require("./locations.control");
const middleware_1 = require("../middle_auth/middleware");
exports.locationRoute = new hono_1.Hono();
exports.locationRoute.get('/location', locations_control_1.getLocations);
exports.locationRoute.get('/location/:id', locations_control_1.getOneLocation);
exports.locationRoute.post('/location', middleware_1.adminRoleAuth, locations_control_1.createLocation);
exports.locationRoute.put('/location/:id', middleware_1.adminRoleAuth, locations_control_1.updateLocation);
exports.locationRoute.delete('/location/:id', middleware_1.adminRoleAuth, locations_control_1.deleteLocation);
