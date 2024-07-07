import { Hono } from "hono";
import { createFleet, deleteFleet, getFleet, getOneFleet, updateFleet } from "./fleet.controller";

export const fleetRoute= new Hono()

fleetRoute.get('/fleet',getFleet)
fleetRoute.get('/fleet/:id',getOneFleet)
fleetRoute.post('/fleet',createFleet)
fleetRoute.put('/fleet/:id',updateFleet)
fleetRoute.delete('/fleet',deleteFleet)