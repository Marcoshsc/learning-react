import axios from 'axios'
import { User } from '../store/user/types'

export const getUsers = async (): Promise<User[]> => {

  const response = await axios.get('http://localhost:3002/')

  return response.data

}

export const addUser = async (user: User): Promise<User> => {
  
  const response = await axios.post('http://localhost:3002/', user)

  return response.data

}

export const editUser = async (id: number, user: User): Promise<User> => {

  const response = await axios.put(`http://localhost:3002/${id}`, user)

  return response.data

}

export const deleteUser = async (id: number): Promise<void> => {

  await axios.delete(`http://localhost:3002/${id}`)

}

