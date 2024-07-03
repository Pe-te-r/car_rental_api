import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { locationInsert, locationSelect, locationTable } from "../drizzle/schema";


 
export const createLocationsDetails=async(locations: locationInsert): Promise<string>=>{
    await db.insert(locationTable).values(locations)
    return "location created successfully"
}

export const deleteLocationsDetails=async(id: number): Promise<string>=>{
    await db.delete(locationTable).where(eq(locationTable.id,id))
    return "deleted successfully"
}

export const updateLocationsDetails=async(id:number,newDetails: Partial<locationInsert>): Promise<string>=>{
    await db.update(locationTable).set(newDetails).where(eq(locationTable.id,id))
    return "updated successfully"
}

export const getLocationsDetails=async(): Promise<locationSelect[] | null>=>{
    return await db.query.locationTable.findMany()
}