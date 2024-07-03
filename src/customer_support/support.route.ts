import { Hono } from "hono";
import { createSupport, deleteSupport, getSupport, updateSupport } from "./support.controller";


export const supportRoute= new Hono()

supportRoute.get('/support', getSupport)
supportRoute.post('/support', createSupport)
supportRoute.put('/support/:id', updateSupport)
supportRoute.delete('/support/:id',deleteSupport)
