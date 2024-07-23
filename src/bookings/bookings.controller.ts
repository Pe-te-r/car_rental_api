import { Context } from "hono";
import { createBookingDetails, getBookingSearchResults,deleteBookingDetails, getBookingDetails, getBookingDetailsByUserId, updateBookingDetails } from "./bookings.services";
import { createPaymentService } from "../payments/payment.services";
// import { checkVehicleAvailability } from "./carAvailability";
export const createBooking = async (c: Context) => {
    try {
      const booking = await c.req.json();
      const result = await createBookingDetails(booking);
      const bookingId = result[0]['id']; 
      return c.json({id: bookingId });
    } catch (error: any) {
      return c.json({ error: error.message });
    }
  };

export const deleteBooking = async (c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const result = await deleteBookingDetails(Number(id))
        return c.json({"result": result},204)
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const updateBooking=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const booking = await c.req.json()
        const result = await updateBookingDetails(Number(id), booking)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const getAllBooking=async(c: Context)=>{
    try {
        const query = c.req.query()
        const limit = query['limit']
        const details = query['details']
        const result = await getBookingDetails(Number(limit),Boolean(details))
        return c.json({"results" : result},200)
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

export const getOneBooking=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({error: "Invalid id"})
        const query = c.req.query()
        const details = query['details']
        const result = await getBookingDetailsByUserId(Number(id),Boolean(details) )
        if(!result) return c.json({"error": "No booking found with this id"})
        return c.json({"results": result})
    } catch (error: any) {
        return c.json({"error": error?.message})
    }
}

export const getBookingSearch=async(c: Context)=>{
    try {
        const vehicle_id= c.req.param('id')
        const result = await getBookingSearchResults(Number(vehicle_id))
        return c.json({"results": result})
    } catch (error: any) {
        console.error(error?.message)
    }
}
