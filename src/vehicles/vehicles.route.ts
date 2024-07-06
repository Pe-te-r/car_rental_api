import { Hono } from "hono";
import { createVehicle,getVehicle, getVehicles, deleteVehicle,updateVehicle } from "./vehicles.controller";
import { allMiddleware } from "../middle_auth/middleware";

export const vehicleRoute= new Hono()

vehicleRoute.get('/vehicles',allMiddleware,getVehicles)
vehicleRoute.get('/vehicles/:id',allMiddleware,getVehicle)
vehicleRoute.post('/vehicles',createVehicle)
vehicleRoute.put('/vehicles/:id',updateVehicle)
vehicleRoute.delete('/vehicles',deleteVehicle)