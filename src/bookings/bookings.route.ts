import { Hono } from "hono";
import { createBooking, deleteBooking, getOneBooking, updateBooking } from "./bookings.controller";


const bookingRoute= new Hono()

bookingRoute.get('/bookings', getOneBooking)
bookingRoute.post('/bookings', createBooking)
bookingRoute.put('/bookings/:id', updateBooking)
bookingRoute.delete('/bookings/:id',deleteBooking)