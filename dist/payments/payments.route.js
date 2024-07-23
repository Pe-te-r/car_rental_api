"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
const middleware_1 = require("../middle_auth/middleware");
exports.paymentRoute = new hono_1.Hono();
exports.paymentRoute.get('/payment', middleware_1.allRoleAuth, payment_controller_1.getPayment);
exports.paymentRoute.get('/payment/:id', middleware_1.allRoleAuth, payment_controller_1.getOnePayment);
// paymentRoute.post('/payment',allRoleAuth,createPayment)
exports.paymentRoute.put('/payment/:id', middleware_1.allRoleAuth, payment_controller_1.updatePayment);
exports.paymentRoute.delete('/payment', middleware_1.adminRoleAuth, payment_controller_1.deletePayament);
exports.paymentRoute.post("/payment", payment_controller_1.createPayment.createCheckoutSession);
