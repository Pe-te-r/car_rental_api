import { Hono } from "hono";
import { createBooking, deleteBooking, getAllBooking, getOneBooking, updateBooking } from "./bookings.controller";


export const bookingRoute= new Hono()

bookingRoute.get('/bookings/:id', getOneBooking)
bookingRoute.get('/bookings', getAllBooking)
bookingRoute.post('/bookings', createBooking)
bookingRoute.put('/bookings/:id', updateBooking)
bookingRoute.delete('/bookings/:id',deleteBooking)