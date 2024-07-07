import { Context } from "hono";
import { createPaymentDetails, deletePayamentDetails, getOnePaymentDetails, getPaymentDetails, updatePaymentDetails } from "./payment.services";

export const createPayment = async (c: Context)=>{
    try {
        const data =await c.req.json()
        const result = await createPaymentDetails(data)
        return c.json({"result": result},201)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const deletePayament=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"error": "Invalid id"}) 
        const result = await deletePayamentDetails(Number(id))
        return c.json({"result": result},204)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const updatePayment=async(c: Context)=>{
    try {
        const id = c.req.param('id');
        if(isNaN(Number(id))) return c.json({"error": "Invalid id"})
        const payment = await c.req.json()
        const result = await updatePaymentDetails(Number(id), payment)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const getPayment=async(c: Context)=>{
    try {
        const query = c.req.query()
        const limit = Number(query['limit'])
        const details = Boolean(query['details'])
        const data = await getPaymentDetails(limit,details)
        return c.json({"result": data},200)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const getOnePayment=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"error": "Invalid id"})  
        const query = c.req.query()
        const details = Boolean(query['details'])
        const data = await getOnePaymentDetails(Number(id), details)
        if(!data) return c.json({"error": "No payment found with this id"})  
        return c.json({"result": data},200)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}