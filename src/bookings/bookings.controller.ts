import { Context } from "hono";
import { deleteBookingDetails, getBookingDetails, updateBookingDetails } from "./bookings.services";

export const createBooking=async(c: Context)=>{
    const booking = await c.req.json()
    return c.json({"result": "Booking created successfully"},201)
}

export const deleteBooking = async (c: Context)=>{
    const id = c.req.param('id')
    const result = await deleteBookingDetails(Number(id))
    return c.json({"result": result},204)
}

export const updateBooking=async(c: Context)=>{
    const id = c.req.param('id')
    const booking = await c.req.json()
    const result = await updateBookingDetails(Number(id), booking)
    return c.json({"result": result})
}

export const getOneBooking=async(c: Context)=>{
    const result = await getBookingDetails()
    return c.json({"results" : result},200)
}
