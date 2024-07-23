import { Context } from "hono";
import {createVehicleDetails, getVehicleDetail, deleteVehicleDetails, getVehicleDetails, updateVehicleDetails } from "./vehicles.services";
import { createSpectDetails, updateSpectDetails } from "../vehicle_spects/spects.services";

export const createVehicle=async (c: Context)=>{
    try {
        const vehicle =await c.req.json()
        console.log(vehicle)
        const vehicleDetails = {
            rental_rate: vehicle.rental,
            availability: vehicle.availability,
            location_id: vehicle.location
        }
        console.log(vehicleDetails)
        const id = await createVehicleDetails(vehicleDetails);
        console.log('vechile id is: ')
        console.log(id)
        const vehicleSpecs = {
            vehicle_specsTable_id:id[0].id,
            manufacturer: vehicle.manufacturer,
            model: vehicle.model,
            year: vehicle.year,
            fuel_type: vehicle.fuel_type,
            engine_capacity: vehicle.engine_capacity,
            transmission_capacity: vehicle.transmission_capacity,
            color: vehicle.color,
            seating_capacity: vehicle.seating_capacity,
            features: vehicle.features
        }
        const result = await createSpectDetails(vehicleSpecs)
        return c.json({"result": result},200)
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}


export const deleteVehicle=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id provided"})
        const result = await deleteVehicleDetails(Number(id))
        return c.json({"result": result},200)
    } catch (error: any) {
        return c.json({"error": "could not delete the vehicle"})
    }
        
}



export const updateVehicle = async (c: Context) => {
    try {
      const id = c.req.param('id');
      if (isNaN(Number(id))) return c.json({ "message": "Invalid id provided" });
  
      const vehicle = await c.req.json();
  
      // Prepare vehicle details for the first table
      const VehicleDetails = {
        rental_rate: vehicle.rental_rate,
        availability: vehicle.availability,
        location_id: vehicle.location
      };
  
      console.log(VehicleDetails);
  
      // Attempt to update the first table
      let updateVehicleResult;
      try {
        updateVehicleResult = await updateVehicleDetails(Number(id), VehicleDetails);
        console.log(updateVehicleResult);
      } catch (error: any) {
        console.log("Error updating vehicle details:", error.message);
        // Continue to attempt to update the second table even if the first update fails
      }
  
      // Prepare vehicle specs for the second table
      const vehicleSpecs = {
        manufacturer: vehicle.manufacturer,
        model: vehicle.model,
        year: vehicle.year,
        fuel_type: vehicle.fuel_type,
        engine_capacity: vehicle.engine_capacity,
        transmission_capacity: vehicle.transmission_capacity,
        color: vehicle.color,
        seating_capacity: vehicle.seating_capacity,
        features: vehicle.features
      };
  
      console.log(vehicleSpecs);
  
      // Attempt to update the second table
      let updateSpecsResult;
      try {
        updateSpecsResult = await updateSpectDetails(Number(id), vehicleSpecs);
        console.log('Update specs result:', updateSpecsResult);
      } catch (error: any) {
        console.log("Error updating vehicle specs:", error.message);
      }
  
      // Combine results for response
      const combinedResults = {
        updateVehicleResult,
        updateSpecsResult
      };
  
      return c.json(combinedResults);
    } catch (error: any) {
      console.log(error?.message);
      return c.json({ "error": "Could not update the vehicle details" });
    }
  };
  

export const getVehicles=async(c: Context)=>{
    try {
        const query = c.req.query()
        const limit = query['limit']
        const details = query['details']
        const results =await getVehicleDetails(Number(limit), Boolean(details))
        if(!results) return c.json({"error": "No vehicles found"})
        return c.json({ results},200)
    } catch (error: any) {
        return c.json({"error": "unknown error"})   
    }
}

export const getVehicle=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"Invalid id provided"})
        const query = c.req.query()
        const details = query['details']
        const result = await getVehicleDetail(Number(id),Boolean(details))
        if(!result) return c.json({"error": "No vehicle found with this id"})
        return c.json({result},200)
    } catch (error: any) {
        return c.json({"error": "unknown error"})
        
    }
}