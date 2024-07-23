import { Hono } from "hono";
import { createBooking, deleteBooking,getBookingSearch, getAllBooking, getOneBooking, updateBooking } from "./bookings.controller";
import { adminRoleAuth, allRoleAuth } from "../middle_auth/middleware";


export const bookingRoute= new Hono()

bookingRoute.get('/bookings/:id',adminRoleAuth ,getOneBooking)
bookingRoute.get('/bookings',allRoleAuth ,getAllBooking)
bookingRoute.post('/bookings',allRoleAuth ,createBooking)
bookingRoute.put('/bookings/:id', adminRoleAuth,updateBooking)
bookingRoute.delete('/bookings/:id',adminRoleAuth,deleteBooking)
bookingRoute.get('/bookings/search/:id',allRoleAuth,getBookingSearch)