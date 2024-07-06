import { Hono } from "hono";
import { addUser, deleteUser, getUser, updateUser } from "./users.control";

export const usersRoute=new Hono()

usersRoute.get('/users/:id',getUser)
usersRoute.post('/users',addUser)
usersRoute.put('/users/:id',updateUser)
usersRoute.delete('/users/:id',deleteUser)