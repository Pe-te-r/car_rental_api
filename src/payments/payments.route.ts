import { Hono } from "hono";
import { createPayment, deletePayament, getOnePayment, getPayment, updatePayment } from "./payment.controller";

export const paymentRoute = new Hono()

paymentRoute.get('/payment', getPayment)
paymentRoute.get('/payment/:id', getOnePayment)
paymentRoute.post('/payment',createPayment)
paymentRoute.put('/payment/:id',updatePayment)
paymentRoute.delete('/payment',deletePayament)