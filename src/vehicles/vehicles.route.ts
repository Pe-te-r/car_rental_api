import { Hono } from "hono";
import { createVehicle, getVehicle, deleteVehicle,updateVehicle } from "./vehicles.controller";
import { allMiddleware } from "../middle_auth/middleware";

export const vehicleRoute= new Hono()

vehicleRoute.get('/vehicles',allMiddleware,getVehicle)
vehicleRoute.post('/vehicles',createVehicle)
vehicleRoute.put('/vehicles',updateVehicle)
vehicleRoute.delete('/vehicles',deleteVehicle)