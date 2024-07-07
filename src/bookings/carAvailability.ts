import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { vehiclesTable } from "../drizzle/schema"

export const checkVehicleAvailability=async(id: number): Promise<any>=>{
    return await db.query.vehiclesTable.findFirst({
        where:eq(vehiclesTable.vehicle_id,id),
        columns:{
            availability: true,
        }
    })
}