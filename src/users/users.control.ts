import { Context } from "hono";

export const getUser=(c: Context)=>{
    return c.json({'username': 'john'})
}
export const addUser=(c: Context)=>{
    return c.json({'message': 'User added successfully'})
}
export const updateUser=(c: Context)=>{
    return c.json({'message': 'User updated successfully'})
}
export const deleteUser=(c: Context)=>{
    return c.json({'message': 'User deleted successfully'})
}
