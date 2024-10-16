import { Hono } from "hono";
import { addUser,getAllUser, deleteUser, getUser, updateUser } from "./users.control";
import { adminRoleAuth, allRoleAuth, userRoleAuth } from "../middle_auth/middleware";

export const usersRoute=new Hono()

usersRoute.get('/users/:id',allRoleAuth,getUser)
usersRoute.get('/users',adminRoleAuth,getAllUser)
usersRoute.post('/users',adminRoleAuth,addUser)
usersRoute.put('/users/:id',allRoleAuth,updateUser)
usersRoute.delete('/users/:id',allRoleAuth,deleteUser)