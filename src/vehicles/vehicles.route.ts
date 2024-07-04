import { Hono } from "hono";
import { createVehicle, getVehicle, deleteVehicle,updateVehicle } from "./vehicles.controller";
import { allMiddleware } from "../middle_auth/middleware";

export const vehicleRoute= new Hono()

vehicleRoute.get('/vehicle',allMiddleware,getVehicle)
vehicleRoute.post('/vehicle',createVehicle)
vehicleRoute.put('/vehicles',updateVehicle)
vehicleRoute.delete('/vehicles',deleteVehicle)