import { Context } from "hono";
import { createSpectDetails, deleteSpectDetails, getSpectDetails, updateSpectDetails } from "./spects.services";

export const createSpects=async(c: Context)=>{
    const spects = await c.req.json()
    const result = await createSpectDetails(spects)
    return c.json({"result": result},201)
}

export const updateSpects= async(c: Context)=>{
    const id = c.req.param('id')
    const spects = await c.req.json()
    const result = await updateSpectDetails(Number(id), spects)
    return c.json({"result": result})
}

export const deleteSpects=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await deleteSpectDetails(Number(id))
    return c.json({"result": result},204)
}

export const getSpects=async(c: Context)=>{
    const result = await getSpectDetails()
    return c.json({"result": result})
}
