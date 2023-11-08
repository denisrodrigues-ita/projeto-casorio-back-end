import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const findUserByEmail = async (email) => {
  try {
    const user = await prisma.engaged.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const authenticateUser = async (email, password) => {

  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValidPassword = await comparePasswords(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  const { password: userPassword, ...responseUser } = user;

  return responseUser;
};
