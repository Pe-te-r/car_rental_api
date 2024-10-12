import db, { stripe } from "../drizzle/db";
import { bookingTable, paymentInsert, paymentTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const createPaymentDetails = async(payments: paymentInsert): Promise<string>=>{
    await db.insert(paymentTable).values(payments);
    return "payment done successfully"
}

export  const deletePayamentDetails=async(id: number): Promise<string>=>{
    await db.delete(paymentTable).where(eq(paymentTable.id,id));
    return "payment deleted successfully"
}

export const updatePaymentDetails=async(id: number, payments: Partial<paymentInsert>): Promise<string>=>{
    await db.update(paymentTable).set(payments).where(eq(paymentTable.id,id));
    return "payment updated successfully"
}

export const getPaymentDetails=async(limit: number,details:boolean): Promise<paymentInsert[] | null>=>{
    if(limit>0 && details){
        return await db.query.paymentTable.findMany({
            limit: limit,
            with:{
                booking: true,
            }
        });
    }else if(limit>0 && !details){
        return await db.query.paymentTable.findMany({
            limit: limit,
        });
    }else if(details){
        return await db.query.paymentTable.findMany(
            {
                with:{
                    booking: true,
                }
            }
        );
    }else {
        return await db.query.paymentTable.findMany();
    }
}

export const getOnePaymentDetails=async(id: number, details: boolean): Promise<any | null> => {
    if(details){
        return await db.query.paymentTable.findFirst({
            where:eq(paymentTable.id,id),
            with:{
                booking: true,
            }
        });
    }else{
        return await db.query.paymentTable.findFirst({
            where:eq(paymentTable.id,id),
        });
    }
}




export const createPaymentService = () => {
    return {
      async createCheckoutSession(bookingId: number, amount: number) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Car Booking",
                },
                unit_amount: amount * 100, // Stripe expects amount in cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/`,
          cancel_url: `${process.env.FRONTEND_URL}/`,
          metadata: {
            bookingId: bookingId.toString(),
          },
        });
        
  
        const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100, // Convert amount to cents
        currency: 'usd',
        metadata: { booking_id: bookingId.toString() }, // Ensure booking_id is a string
      });
      // Update booking status
            await db
              .update(bookingTable)
              .set({ status: "confirmed" })
              .where(eq(bookingTable.id, bookingId));
  
      // Insert payment record into the database
      await db.insert(paymentTable).values({
        booking_id:bookingId,
        // bookingId,
        payment_date: new Date() as unknown as string,
        amount : amount as unknown as string,
        payment_status: 'confirmed',
        payment_method: 'credit_card',
        trasaction_id: paymentIntent.id, 
      }).execute();
  
        return session;
      }
}}

