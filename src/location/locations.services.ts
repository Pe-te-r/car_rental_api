import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { locationInsert, locationSelect, locationTable } from "../drizzle/schema";
import exp = require("constants");


 
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

export const getLocationsDetails=async(limit: number,details: boolean): Promise<locationSelect[] | null>=>{
    if(limit>0 && details){
        return await db.query.locationTable.findMany({
            limit: limit,
            with:{
                vehicles: true,
            }
        })
    }else if(details){
        return await db.query.locationTable.findMany({
            with:{
                vehicles: true,
            }
        })
    }else if (limit >0 && ! details){
        return await db.query.locationTable.findMany({
            limit: limit,
        })
    }else{
        return await db.query.locationTable.findMany()
    }
}

export const getOneLocationDetails = async(id: number,details: boolean)=>{
    if(details){
        return await db.query.locationTable.findFirst({
            where:eq(locationTable.id,id),
            with:{
                vehicles: true,
                bookings: true
            }
        })
    }else{
        return await db.query.locationTable.findFirst({
            where: eq(locationTable.id,id),
        })
    }
}