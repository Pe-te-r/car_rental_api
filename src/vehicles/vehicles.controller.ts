import { Context } from "hono";
import { createVehicleDetails, deleteVehicleDetails, getVehicleDetails, updateVehicleDetails } from "./vehicles.services";
import exp = require("constants");

export const createVehicle=async (c: Context)=>{
    const vehicle =await c.req.json()
    const result = await createVehicleDetails(vehicle);
    return c.json({"result": result},201)
}

export const deleteVehicle=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await deleteVehicleDetails(Number(id))
    return c.json({"result": result},204)
}

export const updateVehicle=async(c: Context)=>{
    const id = c.req.param('id')
    const vehicle = await c.req.json()
    const result =updateVehicleDetails(Number(id),vehicle)
    return c.json({"result": result})
}

export const getVehicle=async(c: Context)=>{
    const results = getVehicleDetails()
    return c.json({"results": results},200)
}