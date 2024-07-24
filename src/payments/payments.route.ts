import { Hono } from "hono";
import { createPayment, deletePayament, getOnePayment, getPayment, updatePayment } from "./payment.controller";
import { adminRoleAuth, allRoleAuth } from "../middle_auth/middleware";

export const paymentRoute = new Hono()

paymentRoute.get('/payment',allRoleAuth ,getPayment)
paymentRoute.get('/payment/:id',allRoleAuth, getOnePayment)
// paymentRoute.post('/payment',allRoleAuth,createPayment)
paymentRoute.put('/payment/:id',adminRoleAuth,updatePayment)
paymentRoute.delete('/payment',adminRoleAuth,deletePayament)


paymentRoute.post(
    "/payment",
    createPayment.createCheckoutSession
  );
  