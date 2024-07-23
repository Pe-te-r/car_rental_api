import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehicleSelect, vehicleInsert, vehiclesTable } from "../drizzle/schema";

type TRVehicle = Array<{ id: number }>;

export const createVehicleDetails=async(vehicleDetails: vehicleInsert): Promise<TRVehicle> => {
   const id =await db.insert(vehiclesTable).values(vehicleDetails).returning({id: vehiclesTable.vehicle_id}).execute()
   if (id && id.length > 0 && id[0].id) {
       return [{ id: id[0].id }];
   } else {
       throw new Error("Failed to retrieve the inserted id");
   }
}

export const deleteVehicleDetails=async(id: number): Promise<string>=>{
   await db.delete(vehiclesTable).where(eq(vehiclesTable.vehicle_id,id))
   return "success"
}

export const updateVehicleDetails=async(id: number, vehicleDetails: Partial<vehicleInsert>): Promise<string>=>{
   await db.update(vehiclesTable).set(vehicleDetails).where(eq(vehiclesTable.vehicle_id,id))
   return "success"
}

export const getVehicleDetails= async(limit: number, details: boolean): Promise<any[] | null>=>{
   if(limit>0 && details){
      return await db.query.vehiclesTable.findMany({
         limit:limit,
         columns:{
            availability:true,
            rental_rate:true,
            vehicle_id:true,
         },
         with:{
            // bookings: true,
            vehicleSpecification: {
               columns:{
                  // model:true,
                  // color:true,
                  // fuel_type:true,
                  manufacturer:true,
                  // engine_capacity:true,
                  seating_capacity:true,
               }
            },
            location:{
               columns:{
                  name:true,
                  // address:true,
                  // contact:true
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
         columns:{
            // availability:true,
            // rental_rate:true,
            // vehicle_id:true,
            location_id:false,
            
         },
         with:{
            // bookings:{},
            vehicleSpecification:{
               columns:{
                  model:true,
                  manufacturer:true,
                  seating_capacity:true,
               }
            },
            location:{
               columns:{
                  name:true,
               },
            },
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
            bookings:{
               columns:{
                  booking_date:true,
                  return_date:true,
               }
            },
            vehicleSpecification:{
               columns:{
                  vehicle_specsTable_id:false,
               }
            },
            // fleetManagementRecords: true,
            location: true,
         }
      })
   }else{
      return await db.query.vehiclesTable.findFirst({
         where:eq(vehiclesTable.vehicle_id,id)
       })
      }
}
