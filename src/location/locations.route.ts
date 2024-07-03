import { Hono } from "hono";
import { createLocation, deleteLocation, getLocations, updateLocation } from "./locations.control";


export const locationRoute = new Hono()

locationRoute.get('/location',getLocations)
locationRoute.post('/location',createLocation)
locationRoute.put('/location/:id', updateLocation)
locationRoute.delete('/location/:id', deleteLocation)