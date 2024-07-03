import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { bookingInsert, bookingSelect, bookingTable } from "../drizzle/schema";

export const createBookingDetails=async(details: bookingInsert): Promise<string>=>{
    await db.insert(bookingTable).values(details)
    return "Booking created successfully"
}

export const deleteBookingDetails=async(id: number): Promise<string>=>{
    await db.delete(bookingTable).where(eq(bookingTable.id,id))
    return "Booking deleted successfully"
}

export const updateBookingDetails=async(id: number, details: Partial<bookingInsert>): Promise<string>=>{
    await db.update(bookingTable).set(details).where(eq(bookingTable.id,id))
    return "Booking updated successfully"
}

export const getBookingDetails= async(): Promise<bookingSelect[] | null>=>{
    return await db.query.bookingTable.findMany()
}