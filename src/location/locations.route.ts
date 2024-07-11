import { Hono } from "hono";
import { createLocation, getOneLocation,deleteLocation, getLocations, updateLocation } from "./locations.control";
import { adminRoleAuth } from "../middle_auth/middleware";


export const locationRoute = new Hono()

locationRoute.get('/location',getLocations)
locationRoute.get('/location/:id',getOneLocation)
locationRoute.post('/location',adminRoleAuth,createLocation)
locationRoute.put('/location/:id',adminRoleAuth, updateLocation)
locationRoute.delete('/location/:id', adminRoleAuth,deleteLocation)