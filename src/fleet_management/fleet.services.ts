import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { fleetManagamentInsert, fleetManagamentSelect, fleetManagamentTable } from "../drizzle/schema";

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

export const getFleetDetails= async(limit: number,details: boolean): Promise<fleetManagamentSelect[] | null>=>{
    if(limit> 0 && details){
        return await db.query.fleetManagamentTable.findMany({
            limit:limit,
            with:{
               vehicle:true 
            }
        })
    }else if(limit > 0 && !details){
        return await db.query.fleetManagamentTable.findMany({limit:limit})
    }else if(details){
        return await db.query.fleetManagamentTable.findMany(
            {
                with:{
                    vehicle:true 
                }
            }
        )
    }else{
        return await db.query.fleetManagamentTable.findMany()
    }

}

export const getOneFleetDetails=async(id: number, details: boolean): Promise<any | null>=>{ 
    if(details){
        return await db.query.fleetManagamentTable.findFirst({
            where:eq(fleetManagamentTable.id,id),
            with:{
               vehicle:true 
            }
        })
    }else{
        return await db.query.fleetManagamentTable.findFirst({where:eq(fleetManagamentTable.id,id)})
    }
}