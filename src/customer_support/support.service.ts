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

export const updateSupportDetails=async(id: number, supportDetailsValue: customer_supportInsert): Promise<string>=>{
    await db.update(customer_support).set(supportDetailsValue).where(eq(customer_support.id, id))
    return 'Support updated successfully'
}

export const getSupportDetails= async(): Promise<customer_supportSelect[] | null>=>{
    return await db.query.customer_support.findMany()
}