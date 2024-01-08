import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/auth.middleware";
import { comparePasswords } from "../utils";

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
  } finally {
    await prisma.$disconnect();
  }
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

export const userVerification = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: "Token mal formatado" });
    }

    const decoded = verifyToken(token);
    const user = await findUserByEmail(decoded.email);

    const { password: userPassword, ...responseUser } = user;

    return { token, user: responseUser };
  } catch (error) {
    throw new Error(error);
  }
};
