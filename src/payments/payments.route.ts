import { Hono } from "hono";
import { createPayment, deletePayament, getPayment, updatePayment } from "./payment.controller";

const paymentRoute = new Hono()

paymentRoute.get('/payment', getPayment)
paymentRoute.post('/payment',createPayment)
paymentRoute.put('/payment',updatePayment)
paymentRoute.delete('/payment',deletePayament)