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

export const getPaymentDetails=async(limit: number,details:boolean): Promise<paymentInsert[] | null>=>{
    if(limit>0 && details){
        return await db.query.paymentTable.findMany({
            limit: limit,
            with:{
                booking: true,
            }
        });
    }else if(limit>0 && !details){
        return await db.query.paymentTable.findMany({
            limit: limit,
        });
    }else if(details){
        return await db.query.paymentTable.findMany(
            {
                with:{
                    booking: true,
                }
            }
        );
    }else {
        return await db.query.paymentTable.findMany();
    }
}

export const getOnePaymentDetails=async(id: number, details: boolean): Promise<any | null> => {
    if(details){
        return await db.query.paymentTable.findFirst({
            where:eq(paymentTable.id,id),
            with:{
                booking: true,
            }
        });
    }else{
        return await db.query.paymentTable.findFirst({
            where:eq(paymentTable.id,id),
        });
    }
}