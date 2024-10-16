"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetRoute = void 0;
const hono_1 = require("hono");
const fleet_controller_1 = require("./fleet.controller");
exports.fleetRoute = new hono_1.Hono();
exports.fleetRoute.get('/fleet', fleet_controller_1.getFleet);
exports.fleetRoute.get('/fleet/:id', fleet_controller_1.getOneFleet);
exports.fleetRoute.post('/fleet', fleet_controller_1.createFleet);
exports.fleetRoute.put('/fleet/:id', fleet_controller_1.updateFleet);
exports.fleetRoute.delete('/fleet', fleet_controller_1.deleteFleet);
