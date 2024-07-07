import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { customer_support, customer_supportInsert, customer_supportSelect } from "../drizzle/schema";
import exp = require("constants");

export const createSupportDetail =async(supportDetailsValue: customer_supportInsert): Promise<string>=>{
    await db.insert(customer_support).values(supportDetailsValue)
    return 'support created successfully'
}

export const deleteSupportDetails= async(id: number): Promise<string>=>{
    await db.delete(customer_support).where(eq(customer_support.id,id))
    return 'Support deleted successfully'
}

export const updateSupportDetails=async(id: number, supportDetailsValue: Partial<customer_supportInsert>): Promise<string>=>{
    await db.update(customer_support).set(supportDetailsValue).where(eq(customer_support.id, id))
    return 'Support updated successfully'
}

export const getSupportDetails= async(limit: number,details: boolean): Promise<customer_supportSelect[] | null>=>{
    if(limit>0 && details){
        return await db.query.customer_support.findMany({
            limit: limit,
            with:{
                user: true,
            }
        })
    }else if(limit>0 && !details){
        return await db.query.customer_support.findMany({
            limit: limit,
        })
    }else if(details){
        return await db.query.customer_support.findMany({
            with:{
                user: true,
            }
        })
    }else{
        return await db.query.customer_support.findMany()
    }

}

export const getOneSupportDetails=async(id: number, details: boolean): Promise<any | null>=>{
    if(details){
        return await db.query.customer_support.findFirst({
            where:eq(customer_support.id,id),
            with:{
                user: true,
            }
        })
    }else{
        return await db.query.customer_support.findFirst({
            where:eq(customer_support.id,id),
        })
    }
}