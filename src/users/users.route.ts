import { Hono } from "hono";
import { addUser,getAllUser, deleteUser, getUser, updateUser } from "./users.control";

export const usersRoute=new Hono()

usersRoute.get('/users/:id',getUser)
usersRoute.get('/users',getAllUser)
usersRoute.post('/users',addUser)
usersRoute.put('/users/:id',updateUser)
usersRoute.delete('/users/:id',deleteUser)