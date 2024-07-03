import { Hono } from "hono";
import { createVehicle, getVehicle, deleteVehicle,updateVehicle } from "./vehicles.controller";

export const vehicleRoute= new Hono()

vehicleRoute.get('/vehicle',getVehicle)
vehicleRoute.post('/vehicle',createVehicle)
vehicleRoute.put('/vehicles',updateVehicle)
vehicleRoute.delete('/vehicles',deleteVehicle)