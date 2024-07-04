import { Context } from "hono";
import { createPaymentDetails, deletePayamentDetails, getPaymentDetails, updatePaymentDetails } from "./payment.services";

export const createPayment = async (c: Context)=>{
    const data =await c.req.json()
    const result = await createPaymentDetails(data)
    return c.json({"result": result},201)
}

export const deletePayament=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await deletePayamentDetails(Number(id))
    return c.json({"result": result},204)
}

export const updatePayment=async(c: Context)=>{
    const id = c.req.param('id')
    const payment = await c.req.json()
    const result = await updatePaymentDetails(Number(id), payment)
    return c.json({"result": result})
}

export const getPayment=async(c: Context)=>{
    const data = await getPaymentDetails()
    return c.json({"result": data},200)
}