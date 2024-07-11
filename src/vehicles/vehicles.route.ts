import { Hono } from "hono";
import { createVehicle,getVehicle, getVehicles, deleteVehicle,updateVehicle } from "./vehicles.controller";
import { adminRoleAuth, allMiddleware } from "../middle_auth/middleware";

export const vehicleRoute= new Hono()

vehicleRoute.get('/vehicles',getVehicles)
vehicleRoute.get('/vehicles/:id',allMiddleware,getVehicle)
vehicleRoute.post('/vehicles',adminRoleAuth,createVehicle)
vehicleRoute.put('/vehicles/:id',adminRoleAuth,updateVehicle)
vehicleRoute.delete('/vehicles',adminRoleAuth,deleteVehicle)