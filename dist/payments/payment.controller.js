"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.getOnePayment = exports.getPayment = exports.updatePayment = exports.deletePayament = void 0;
const payment_services_1 = require("./payment.services");
// export const createPayment = async (c: Context)=>{
//     try {
//         const data =await c.req.json()
//         const result = await createPaymentDetails(data)
//         return c.json({"result": result},201)
//     } catch (error: any) {
//         return c.json({"error": error?.message})
//     }
// }
const deletePayament = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "error": "Invalid id" });
        const result = await (0, payment_services_1.deletePayamentDetails)(Number(id));
        return c.json({ "result": result }, 204);
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.deletePayament = deletePayament;
const updatePayment = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "error": "Invalid id" });
        const payment = await c.req.json();
        const result = await (0, payment_services_1.updatePaymentDetails)(Number(id), payment);
        return c.json({ "result": result });
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.updatePayment = updatePayment;
const getPayment = async (c) => {
    try {
        const query = c.req.query();
        const limit = Number(query['limit']);
        const details = Boolean(query['details']);
        const data = await (0, payment_services_1.getPaymentDetails)(limit, details);
        return c.json({ "result": data }, 200);
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.getPayment = getPayment;
const getOnePayment = async (c) => {
    try {
        const id = c.req.param('id');
        if (isNaN(Number(id)))
            return c.json({ "error": "Invalid id" });
        const query = c.req.query();
        const details = Boolean(query['details']);
        const data = await (0, payment_services_1.getOnePaymentDetails)(Number(id), details);
        if (!data)
            return c.json({ "error": "No payment found with this id" });
        return c.json({ "result": data }, 200);
    }
    catch (error) {
        return c.json({ "error": error?.message });
    }
};
exports.getOnePayment = getOnePayment;
const paymentService = (0, payment_services_1.createPaymentService)();
exports.createPayment = {
    async createCheckoutSession(c) {
        try {
            const { bookingId, amount } = await c.req.json();
            console.log(`Check if id and amount is being received: ${bookingId}, amount: ${amount}`);
            const session = await paymentService.createCheckoutSession(bookingId, amount);
            return c.json({ sessionId: session.id, checkoutUrl: session.url });
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            return c.json({ success: false, error: "Failed to create checkout session" }, 500);
        }
    }
};
