
import { Context } from "hono";
import { addUserDetails, deletUsersDetails, getAllUserDetails, getOneUserDetails, updateUserDetails } from "./users.services";
import { any } from "zod";


export const getUser=async(c: Context)=>{
    const id = c.req.param('id')
    if(isNaN(Number(id))) return c.json({"message":"insert a valid id"})
    const result = await getOneUserDetails(Number(id))
    if(result===undefined) return c.json({"message":`no such user with id ${id}`})
    return c.json({"results" : result})
}

export const getAllUser=async(c: Context)=>{
    try {
        const query= c.req.query()
        const limt = query['limit']
        const details = query['details']
        const result = await getAllUserDetails(Number(limt),Boolean(details))
        if(result === null) return c.json({"message":"no user available"})
        return c.json(result)
    } catch (error: any) {
        return c.json({"message": "error occured"})
    }
}

// controller for adding a user
export const addUser=async(c: Context)=>{
    try {
        const details = await c.req.json()
        const results= await addUserDetails(details) 
        return c.json({'message':results},201)
    } catch (error: any) {
        return c.json({'message':"Error adding user"})
    }
}

// controller for update a user
export const updateUser=async(c: Context)=>{
    try {
        const newDetails= await c.req.json()
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"insert a valid id"})
        const results = await updateUserDetails(Number(id),newDetails)
        return c.json({'message': results})
    } catch (error: any) {
        return c.json({'message': "error updating the user details"})
    }
}
// controller for updating user details
export const deleteUser=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        if(isNaN(Number(id))) return c.json({"message":"insert a valid id"})
        const results = await deletUsersDetails(Number(id))
        return c.json({'message': results})
    } catch (error: any) {
        return c.json({"message":"Error deleting user"})
    }
}
