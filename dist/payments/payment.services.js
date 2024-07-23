"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentService = exports.getOnePaymentDetails = exports.getPaymentDetails = exports.updatePaymentDetails = exports.deletePayamentDetails = exports.createPaymentDetails = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createPaymentDetails = async (payments) => {
    await db_1.default.insert(schema_1.paymentTable).values(payments);
    return "payment done successfully";
};
exports.createPaymentDetails = createPaymentDetails;
const deletePayamentDetails = async (id) => {
    await db_1.default.delete(schema_1.paymentTable).where((0, drizzle_orm_1.eq)(schema_1.paymentTable.id, id));
    return "payment deleted successfully";
};
exports.deletePayamentDetails = deletePayamentDetails;
const updatePaymentDetails = async (id, payments) => {
    await db_1.default.update(schema_1.paymentTable).set(payments).where((0, drizzle_orm_1.eq)(schema_1.paymentTable.id, id));
    return "payment updated successfully";
};
exports.updatePaymentDetails = updatePaymentDetails;
const getPaymentDetails = async (limit, details) => {
    if (limit > 0 && details) {
        return await db_1.default.query.paymentTable.findMany({
            limit: limit,
            with: {
                booking: true,
            }
        });
    }
    else if (limit > 0 && !details) {
        return await db_1.default.query.paymentTable.findMany({
            limit: limit,
        });
    }
    else if (details) {
        return await db_1.default.query.paymentTable.findMany({
            with: {
                booking: true,
            }
        });
    }
    else {
        return await db_1.default.query.paymentTable.findMany();
    }
};
exports.getPaymentDetails = getPaymentDetails;
const getOnePaymentDetails = async (id, details) => {
    if (details) {
        return await db_1.default.query.paymentTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.paymentTable.id, id),
            with: {
                booking: true,
            }
        });
    }
    else {
        return await db_1.default.query.paymentTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.paymentTable.id, id),
        });
    }
};
exports.getOnePaymentDetails = getOnePaymentDetails;
const createPaymentService = () => {
    return {
        async createCheckoutSession(bookingId, amount) {
            const session = await db_1.stripe.checkout.sessions.create({
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
            const paymentIntent = await db_1.stripe.paymentIntents.create({
                amount: Number(amount) * 100, // Convert amount to cents
                currency: 'usd',
                metadata: { booking_id: bookingId.toString() }, // Ensure booking_id is a string
            });
            // Update booking status
            await db_1.default
                .update(schema_1.bookingTable)
                .set({ status: "confirmed" })
                .where((0, drizzle_orm_1.eq)(schema_1.bookingTable.id, bookingId));
            // Insert payment record into the database
            await db_1.default.insert(schema_1.paymentTable).values({
                booking_id: bookingId,
                // bookingId,
                payment_date: new Date(),
                amount: amount,
                payment_status: 'confirmed',
                payment_method: 'credit_card',
                trasaction_id: paymentIntent.id,
            }).execute();
            return session;
        }
    };
};
exports.createPaymentService = createPaymentService;
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
