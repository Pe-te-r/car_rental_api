import { Hono } from "hono";
import { createSpects, deleteSpects,getSpect, getSpects, updateSpects } from "./spects.control";

export const VehicleSpectsRoute= new Hono()

VehicleSpectsRoute.get('/vehicle-spects', getSpects)
VehicleSpectsRoute.get('/vehicle-spects/:id', getSpect)
VehicleSpectsRoute.post('/vehicle-spects', createSpects)
VehicleSpectsRoute.put('/vehicle-spects/:id', updateSpects)
VehicleSpectsRoute.delete('/vehicle-spects/:id', deleteSpects)