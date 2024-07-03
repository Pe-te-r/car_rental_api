
import { Context } from "hono";
import { addUserDetails, deletUsersDetails, getOneUserDetails, updateUserDetails } from "./users.services";
// import { userLogin } from "../types/types";

export const getUser=async(c: Context)=>{
    const id = c.req.param('id')
    const result = await getOneUserDetails(Number(id))
    return c.json({"results" : result})
}

// controller for adding a user
export const addUser=async(c: Context)=>{
    const details = await c.req.json()
    const results= await addUserDetails(details) 
    return c.json({'message':results},201)
}

// controller for update a user
export const updateUser=async(c: Context)=>{
    const newDetails= await c.req.json()
    const id = c.req.param('id')
    const results = await updateUserDetails(Number(id),newDetails)
    return c.json({'message': results})
}
// controller for updating user details
export const deleteUser=async(c: Context)=>{
    const id = c.req.param('id')
    const results = await deletUsersDetails(Number(id))
    return c.json({'message': results})
}
