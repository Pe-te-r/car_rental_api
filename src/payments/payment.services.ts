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
          success_url: `${process.env.FRONTEND_URL}/booking-success`,
          cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
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




// const stripe = new Stripe(process.env.STRIPE as string, {
//     apiVersion: '2024-06-20',
// });

// export const createPaymentIntent = async (amount: number, currency: string, booking_id: number) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency,
//     });

//     await db.insert(paymentTable).values({
//         booking_id,
//         amount,
//         payment_status: 'Pending',
//         payment_method: 'card',
//         transaction_id: paymentIntent.id,
//     }).execute();

//     return paymentIntent;
// };

// export const createCheckoutSession = async (amount: number, currency: string, booking_id: number) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//             {
//                 price_data: {
//                     currency: currency,
//                     product_data: {
//                         name: 'Car rental',
//                     },
//                     unit_amount: Math.round(amount),
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: process.env.SUCCESS_URL as string,
//         cancel_url: process.env.CANCEL_URL as string,
//     });

//     await db.insert(paymentTable).values({
//         booking_id,
//         amount,
//         payment_status: 'Pending',
//         payment_method: 'card',
//         transaction_id: session.id,
//     }).execute();

//     return session;
// };

// export const handleWebhook = async (payload: string, sig: string, webhookSecret: string) => {
//     try {
//         const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object as Stripe.Checkout.Session;

//             await db.update(paymentTable).set({
//                 payment_status: 'Succeeded',
//                 payment_date: new Date(session.created * 1000).toISOString(),
//             }).where(eq(paymentTable.transaction_id, session.id)).execute();

//             const payment = await db.query.paymentTable.findFirst({
//                 where: eq(paymentTable.transaction_id, session.id)});
//             if (payment) {
//                 await db.update(bookingsTable).set({
//                     booking_status: 'Succeeded',
//                 }).where(eq(bookingsTable.booking_id, payment.booking_id)).execute();
//             }
//         }
//         return event;

//     } catch (err: any) {
//         throw new Error(Webhook Error: ${err.message});
//     }
// };