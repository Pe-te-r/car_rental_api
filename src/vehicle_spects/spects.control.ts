import { Context } from "hono";
import { createSpectDetails, deleteSpectDetails, getSpectDetailOne, getSpectDetails, updateSpectDetails } from "./spects.services";

export const createSpects=async(c: Context)=>{
    try {
        const spects = await c.req.json()
        const result = await createSpectDetails(spects)
        return c.json({"result": result},201)
    } catch (error: any) {
        return c.json({"error": error.message},)
    }
}

export const updateSpects= async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id"})
        const spects = await c.req.json()
        const result = await updateSpectDetails(Number(id), spects)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": "Error updating"})        
    }
}

export const deleteSpects=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id"})  
        const result = await deleteSpectDetails(Number(id))
        if(!result) return c.json({"message":"not found"})
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": "Error deleting"})
    }
}

export const getSpects=async(c: Context)=>{
    try {
        const query =c.req.query()
        const details = query['details']
        const limit = query['limit']
        const result = await getSpectDetails(Number(limit),Boolean(details))
        if(!result) return c.json({"error": "No vehicle found"})
        return c.json({"result": result})        
    } catch (error: any) {
        return c.json({"error": error.message})        
    }
}
export const getSpect=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id"})
        const query =c.req.query()
        const details = query['details']
        const result = await getSpectDetailOne(Number(id),Boolean(details))
        if(!result) return c.json({"error": "No vehicle found with this id"})
        return c.json({"result": result})
    } catch (error: any){     
        return c.json({"error": "Error getting"})
    }
}
