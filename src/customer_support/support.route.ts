import { Hono } from "hono";
import { createSupport, deleteSupport, getOneSupport, getSupport, updateSupport } from "./support.controller";


export const supportRoute= new Hono()

supportRoute.get('/support', getSupport)
supportRoute.get('/support/:id', getOneSupport)
supportRoute.post('/support', createSupport)
supportRoute.put('/support/:id', updateSupport)
supportRoute.delete('/support/:id',deleteSupport)
