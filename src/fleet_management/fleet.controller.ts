import { Context } from "hono";
import { createFleetDetails, deleteFleetDetails, getFleetDetails, updateFleetDetails } from "./fleet.services";

export const createFleet=async(c: Context)=>{
    const fleet = await c.req.json()
    const result = await createFleetDetails(fleet)
    return c.json({"result": result},201)
}

export const deleteFleet=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await deleteFleetDetails(Number(id))
    return c.json({"result": result},204)
}

export const updateFleet=async(c: Context)=>{
    const id = c.req.param('id')
    const fleet = await c.req.json()
    const result = await updateFleetDetails(Number(id), fleet)
    return c.json({"result": result})
}

export const getFleet=async(c: Context)=>{
    const results = await getFleetDetails()
    return c.json({"results": results},200)
}