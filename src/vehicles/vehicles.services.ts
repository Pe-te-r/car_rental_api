import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehicleSelect, vehicleInsert, vehiclesTable } from "../drizzle/schema";

export const createVehicleDetails=async(vehicleDetails: vehicleInsert): Promise<string>=>{
   await db.insert(vehiclesTable).values(vehicleDetails)
   return "Vehicle created successfully"
}

export const deleteVehicleDetails=async(id: number): Promise<string>=>{
   await db.delete(vehiclesTable).where(eq(vehiclesTable.vehicle_id,id))
   return "Vehicle deleted successfully"
}

export const updateVehicleDetails=async(id: number, vehicleDetails: Partial<vehicleInsert>): Promise<string>=>{
   await db.update(vehiclesTable).set(vehicleDetails).where(eq(vehiclesTable.vehicle_id,id))
   return "Vehicle updated successfully"
}

export const getVehicleDetails= async(): Promise<VehicleSelect[] | null>=>{
   return await db.query.vehiclesTable.findMany({
      limit: 10,
      with:{
         vehicleSpecification: true
      }
   })

}