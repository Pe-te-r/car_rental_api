import { Context } from "hono"
import { createSupportDetail, deleteSupportDetails, getSupportDetails, updateSupportDetails } from "./support.service"

export const createSupport =async(c: Context)=>{
    const support = await c.req.json()
    const results = await createSupportDetail(support)
    return c.json({"result": results},201)
}

export const deleteSupport = async (c: Context)=>{
    const id = c.req.param('id')
    const results = await deleteSupportDetails(Number(id))
    return c.json({"result": results})
}

export const updateSupport=async(c: Context)=>{
    const id = c.req.param('id')
    const support = await c.req.json()
    const results = await updateSupportDetails(Number(id), support)
    return c.json({"result": results})
}

export const getSupport=async(c: Context)=>{
    const results = await getSupportDetails()
    return c.json({"results": results})
}