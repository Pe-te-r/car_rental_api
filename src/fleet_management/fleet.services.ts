import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { fleetManagamentInsert, fleetManagamentTable } from "../drizzle/schema";

export const createFleetDetails=async(fleet: fleetManagamentInsert): Promise<string>=>{
    await db.insert(fleetManagamentTable).values(fleet)
    return "Fleet created successfully"
}

export const deleteFleetDetails=async(id: number): Promise<string>=>{
    await db.delete(fleetManagamentTable).where(eq(fleetManagamentTable.id,id))
    return "Fleet deleted successfully"
}

export const updateFleetDetails=async(id:number, details: Partial<fleetManagamentInsert>): Promise<string>=>{
    await db.update(fleetManagamentTable).set(details).where(eq(fleetManagamentTable.id,id))
    return "Fleet updated successfully"
}

export const getFleetDetails= async(): Promise<fleetManagamentInsert[] | null>=>{
    return await db.query.fleetManagamentTable.findMany()
}