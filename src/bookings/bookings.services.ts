import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { bookingInsert, bookingSelect, bookingTable } from "../drizzle/schema";

type TRIBook = Array<{ id: number }>;


export const createBookingDetails=async(details: bookingInsert): Promise<TRIBook>=>{
    return   await db.insert(bookingTable).values(details).returning({id:bookingTable.id}).execute()
}

export const deleteBookingDetails=async(id: number): Promise<string>=>{
    await db.delete(bookingTable).where(eq(bookingTable.id,id))
    return "Booking deleted successfully"
}

export const updateBookingDetails=async(id: number, details: Partial<bookingInsert>): Promise<string>=>{
    await db.update(bookingTable).set(details).where(eq(bookingTable.id,id))
    return "Booking updated successfully"
}

export const getBookingDetails= async(limit: number,details: boolean): Promise<bookingSelect[] | null>=>{
    if(limit> 0&& details){
        return await db.query.bookingTable.findMany({
            limit: limit,
            with:{
                user: true,
                vehicle: true,
                location: true,
                payment:true
            }
        })
    }else if(limit > 0 && !details){
        return await db.query.bookingTable.findMany({
            limit: limit,
        })
    }else if(details){
        return await db.query.bookingTable.findMany({
            with:{
                user:{
                    columns:{
                      name:true,
                      email:true,
                      contact_phone:true,  
                    }
                },
                vehicle: {
                    with:{
                        vehicleSpecification:{
                            columns:{
                                manufacturer:true,
                                model:true,
                            }
                        }
                    }
                },
                location:{
                    columns:{
                        name:true,
                        contact:true,
                    }
                },
                payment:{
                    columns:{
                        payment_status:true,
                    }
                }
            }
        })
    }else{
        return await db.query.bookingTable.findMany()
    }
}

export const getBookingDetailsByUserId=async(id: number,  details: boolean): Promise<any | null>=>{
    if(details){
        return await db.query.bookingTable.findFirst({
            where:eq(bookingTable.id,id),
            with:{
                user: true,
                vehicle: true,
                location: true,
                payment:true
            }
        })
    }else{
        return await db.query.bookingTable.findFirst({
            where:eq(bookingTable.id,id),
        })
    }
}





export const getBookingSearchResults=async(id: number)=>{
    return await db.query.bookingTable.findMany({
        where:eq(bookingTable.vehicle_id,id),
        columns:{
            booking_date: true,
            return_date:true,
        }
    })
}