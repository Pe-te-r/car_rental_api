import { Hono } from "hono";
import { createFleet, deleteFleet, getFleet, updateFleet } from "./fleet.controller";

export const fleetRoute= new Hono()

fleetRoute.get('/fleet',getFleet)
fleetRoute.post('/fleet',createFleet)
fleetRoute.put('/fleet',updateFleet)
fleetRoute.delete('/fleet',deleteFleet)