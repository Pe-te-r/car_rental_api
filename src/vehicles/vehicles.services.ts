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

export const getVehicleDetails= async(limit: number, details: boolean): Promise<VehicleSelect[] | null>=>{
   if(limit>0 && details){
      return await db.query.vehiclesTable.findMany({
         limit:limit,
         with:{
            bookings: true,
            vehicleSpecification: {
               columns:{
                  model:true,
                  color:true,
                  fuel_type:true,
                  manufacturer:true,
                  engine_capacity:true,
                  seating_capacity:true,
               }
            },
            location:{
               columns:{
                  name:true,
                  address:true,
                  contact:true
               }
            }
         }

       })
   }else if(limit>0 && !details){
      return await db.query.vehiclesTable.findMany({
         limit:limit,
       })
   }else if(details){
      return await db.query.vehiclesTable.findMany({
         with:{
            bookings: true,
            vehicleSpecification: true,
            location: true,
            fleetManagementRecords:true
         }
       })
   }else{
      return await db.query.vehiclesTable.findMany()
   }
}

export const getVehicleDetail=async(id: number,details:boolean): Promise<any | null>=>{
   if(details){
      return await db.query.vehiclesTable.findFirst({
         where:eq(vehiclesTable.vehicle_id,id),
         with:{
            bookings: true,
            vehicleSpecification: true,
            fleetManagementRecords: true,
            location: {
               columns:{
                  name:true
               }
            }
         }
 
      })
   }else{
      return await db.query.vehiclesTable.findFirst({
         where:eq(vehiclesTable.vehicle_id,id)
       })
   }
}