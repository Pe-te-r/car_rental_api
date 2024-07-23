import { Hono } from "hono";
import { createSupport, deleteSupport, getOneSupport, getSupport, updateSupport } from "./support.controller";
import { adminRoleAuth, allRoleAuth } from "../middle_auth/middleware";


export const supportRoute= new Hono()

supportRoute.get('/support', allRoleAuth,getSupport)
supportRoute.get('/support/:id',allRoleAuth, getOneSupport)
supportRoute.post('/support', allRoleAuth,createSupport)
supportRoute.put('/support/:id',allRoleAuth,updateSupport)
supportRoute.delete('/support/:id',adminRoleAuth,deleteSupport)
