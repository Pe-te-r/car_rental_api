import { Context } from "hono";
import { createLocationsDetails, deleteLocationsDetails, updateLocationsDetails } from "./locations.services";

export const createLocation=async(c: Context)=>{
    const newLocation=await c.req.json()
    const result = await createLocationsDetails(newLocation)
    return c.json({result: result}, 201)
}

export const deleteLocation=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await deleteLocationsDetails(Number(id))
    return c.json({result: result}, 204)
}

export const updateLocation=async(c: Context)=>{
    const id = c.req.param('id')
    const newDetails = await c.req.json()
    const result = await updateLocationsDetails(Number(id), newDetails)
    return c.json({result: result})
}

export const getLocations=async(c: Context)=>{
    const results = await c.req.json()
    return c.json({results: results}, 200)
}
