import { Context } from "hono";
import { createVehicleDetails,getVehicleDetail, deleteVehicleDetails, getVehicleDetails, updateVehicleDetails } from "./vehicles.services";

export const createVehicle=async (c: Context)=>{
    try {
        const vehicle =await c.req.json()
        const result = await createVehicleDetails(vehicle);
        return c.json({"result": result},201)
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

export const deleteVehicle=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id provided"})
        const result = await deleteVehicleDetails(Number(id))
        return c.json({"result": result},204)
    } catch (error: any) {
        return c.json({"error": "could not delete the vehicle"})
    }
        
}

export const updateVehicle=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id provided"})
        const vehicle = await c.req.json()
    console.log(vehicle)
        const result =await updateVehicleDetails(Number(id),vehicle)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": "could not update the vehicle details"})
    }
}

export const getVehicles=async(c: Context)=>{
    try {
        const query = c.req.query()
        const limit = query['limit']
        const details = query['details']
        const results =await getVehicleDetails(Number(limit), Boolean(details))
        if(!results) return c.json({"error": "No vehicles found"})
        return c.json({ results},200)
    } catch (error: any) {
        return c.json({"error": "unknown error"})   
    }
}

export const getVehicle=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id provided"})
        const query = c.req.query()
        const details = query['details']
        const result = await getVehicleDetail(Number(id),Boolean(details))
        if(!result) return c.json({"error": "No vehicle found with this id"})
        return c.json({result},200)
    } catch (error: any) {
        return c.json({"error": "unknown error"})
        
    }
}