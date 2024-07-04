import { promises } from "dns";
import db from "../drizzle/db";
import { paymentInsert, paymentTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const createPaymentDetails = async(payments: paymentInsert): Promise<string>=>{
    await db.insert(paymentTable).values(payments);
    return "payment done successfully"
}

export  const deletePayamentDetails=async(id: number): Promise<string>=>{
    await db.delete(paymentTable).where(eq(paymentTable.id,id));
    return "payment deleted successfully"
}

export const updatePaymentDetails=async(id: number, payments: Partial<paymentInsert>): Promise<string>=>{
    await db.update(paymentTable).set(payments).where(eq(paymentTable.id,id));
    return "payment updated successfully"
}

export const getPaymentDetails=async(): Promise<paymentInsert[] | null>=>{
    return await db.query.paymentTable.findMany()
}