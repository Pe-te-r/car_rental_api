import { Context } from "hono"
import { createSupportDetail, deleteSupportDetails, getOneSupportDetails, getSupportDetails, updateSupportDetails } from "./support.service"

export const createSupport =async(c: Context)=>{
    try {
        const support = await c.req.json()
        console.log(support)
        const results = await createSupportDetail(support)
        console.log(results)
        return c.json({"results": results},200)
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

export const deleteSupport = async (c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const results = await deleteSupportDetails(Number(id))
        return c.json({"results": results})
    } catch (error: any) {
        return c.json({error: 'delete error'})
    }
}

export const updateSupport=async(c: Context)=>{
    try {
        const id = c.req.param('id')
    console.log(id)
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const support = await c.req.json()
    console.log(support)
        const results = await updateSupportDetails(Number(id), support)
        return c.json({"results": results})
    } catch (error: any) {
        return c.json({ error: 'update error' })
    }
}

export const getSupport=async(c: Context)=>{
    try {        
        const query= c.req.query()
        const limit = Number(query.limit)
        const details = query['details']
        const results = await getSupportDetails(Number(limit),Boolean(details))
        return c.json({"results": results})
    } catch (error: any) {
        return c.json({"error": 'error'})    
    }
}

export const getOneSupport=async(c: Context)=>{
    try {
        const id = c.req.param('id');
        if(isNaN(Number(id))) return c.json({"error": "Invalid id"})
        const query = c.req.query()
        const details = query['details']
        console.log(details)
        const result = await getOneSupportDetails(Number(id), Boolean(details))
        if(!result) return c.json({"error": "No support service found with this id"})
        return c.json({"results": result})
    } catch (error: any) {
        return c.json({"error": 'error'})
    }
}
