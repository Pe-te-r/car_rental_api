import { Context } from "hono";
import { createFleetDetails, deleteFleetDetails, getFleetDetails, getOneFleetDetails, updateFleetDetails } from "./fleet.services";

export const createFleet=async(c: Context)=>{
    try {
        const fleet = await c.req.json()
        const result = await createFleetDetails(fleet)
        return c.json({"result": result},201)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const deleteFleet=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const result = await deleteFleetDetails(Number(id))
        return c.json({"result": result},204)
    } catch (error: any) {
        return c.json({"error": error.message},500)
    }
        
}

export const updateFleet=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})  
        const fleet = await c.req.json()
        const result = await updateFleetDetails(Number(id), fleet)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const getFleet=async(c: Context)=>{
    try {
        const query = c.req.query()
        const limit = Number(query.limit) 
        const details = true
        const results = await getFleetDetails(Number(limit),Boolean(details))
        return c.json({"results": results},200)
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

export const getOneFleet = async(c: Context)=>{
    try {
        const id = c.req.param('id');
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const query = c.req.query()
        const details = query['details']
        const result = await getOneFleetDetails(Number(id), Boolean(details))
        if(!result) return c.json({"error": "No vehicle found with this id"})
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": error.message},500)
    }
}