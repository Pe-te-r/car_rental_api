import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { vehicle_specsInsert, vehicle_specsSelect, vehicle_specsTable } from "../drizzle/schema";

export const createSpectDetails=async(spects: vehicle_specsInsert): Promise<string> => {
    await db.insert(vehicle_specsTable).values(spects)
    return "spects created successfully"
}

export const deleteSpectDetails=async(id: number): Promise<string> => {
    await db.delete(vehicle_specsTable).where(eq(vehicle_specsTable.vehicle_specsTable_id,id))
    return "spects deleted successfully"
}

export const updateSpectDetails=async(id: number, spects: Partial<vehicle_specsInsert>): Promise<string> => {
    await db.update(vehicle_specsTable).set(spects).where(eq(vehicle_specsTable.vehicle_specsTable_id,id))
    return "spects updated successfully"
}

export const getSpectDetails= async(): Promise<vehicle_specsSelect[] | null> => {
    return await db.query.vehicle_specsTable.findMany()
}

