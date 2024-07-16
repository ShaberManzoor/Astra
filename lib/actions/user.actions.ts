// 'use server'

import { CreateUserParams, UpdateUserParams } from "@/types/user"
import { connectToDB } from "../database/mongoose"
import User from "../database/models/User"

// import { cookies } from "next/headers";

// import axios from 'axios';

// export const fetchUser = async (token: string) => {
//   try {
//     const res = await axios.get(`/api/user/get-user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data.data;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     return null;
//   }
// };

// export const userLogout = () => {
//     cookies().delete('token');
// }

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDB()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDB()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDB()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    console.log(error)
  }
}