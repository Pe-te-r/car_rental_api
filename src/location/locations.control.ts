import { Context } from "hono";
import { createLocationsDetails, deleteLocationsDetails, getLocationsDetails, getOneLocationDetails, updateLocationsDetails } from "./locations.services";

export const createLocation=async(c: Context)=>{
    try {
        const newLocation=await c.req.json()
        const result = await createLocationsDetails(newLocation)
        return c.json({result: result}, 201)
    } catch (error: any) {
        return c.json({error: error.message}, 500)        
    }
}

export const deleteLocation=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        console.log(id)
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const result = await deleteLocationsDetails(Number(id))
        return c.json({result: result},200)
    } catch (error: any) {
        return c.json({error: error.message}, 500)        
    }
}

export const updateLocation=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"}) 
        const newDetails = await c.req.json()
        const result = await updateLocationsDetails(Number(id), newDetails)
        return c.json({result: result})
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

export const getLocations=async(c: Context)=>{
    try {   
        const query = c.req.query()
        const limit = query['limit']
        const details = query['details']
        const results = await getLocationsDetails(Number(limit),Boolean(details))
        if(results === null) return c.json({error: "No locations found"})
            return c.json({results: results})
    } catch (error: any) {
        return c.json({error: error.message})
    }
}

export const getOneLocation=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const query = c.req.query()
        const details = query['details']
        const result =await getOneLocationDetails(Number(id), Boolean(details))
        if(!result) return c.json({'message': "nothing found"})
        return c.json({results: result})
    } catch (error: any) {
        return c.json({error: error.message})
    }
}