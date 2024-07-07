import { Context } from "hono";
import { createBookingDetails, deleteBookingDetails, getBookingDetails, getBookingDetailsByUserId, updateBookingDetails } from "./bookings.services";
import exp = require("constants");
import { checkVehicleAvailability } from "./carAvailability";

export const createBooking=async(c: Context)=>{
    try {
        const booking = await c.req.json()
        const available = await checkVehicleAvailability(booking['vehicle_id']);
        if(!available) return c.json({"error": "Vehicle not available"})
        const result = await createBookingDetails(booking)
        return c.json({"result": result})
    } catch (error: any) {
        return c.json({"error": error.message})
    }
}

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