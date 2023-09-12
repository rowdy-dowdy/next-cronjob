"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "../admin/prismadb";
import { User } from "@prisma/client";
import { exclude } from "../utils/helper";
import { isName, isPassword, removeSpace } from "@/lib/utils/validator"
import bcrypt from 'bcrypt'
import isEmail from "validator/lib/isEmail"

export type UserType = Omit<User, "password">| null

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    const userWithoutPassword: UserType = exclude(currentUser, ['password'])

    return userWithoutPassword

  } catch (error: any) {
    return null
  }
}

export const register = async (data: {
  name: string, email: string, password: string
}) => {
  "use server"
  try {
    if (!isEmail(data.email)) throw "Email không hợp lệ"
    if (!isPassword(data.password)) throw "Mật khẩu không hợp lệ"

    const name = removeSpace(data.name)
    if (!isName(name)) throw "Tên không hợp lệ"

    await db.user.create({
      data: {
        email: data.email,
        name: name,
        password: await bcrypt.hash(data.password, 10),
      }
    })
  } catch (error) {
    console.log({error})
    throw (typeof error === "string" && error != "") ? error : 'Có lỗi xảy ra vui lòng thử lại sau'
  }
}