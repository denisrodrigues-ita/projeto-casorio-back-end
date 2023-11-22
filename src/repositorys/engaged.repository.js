import bcrypt from "bcrypt";
import { comparePasswords, hashPasswordBcrypt } from "../utils";
import { prisma } from "../services/prisma";

export const createEngaged = async (data) => {
  try {
    const hashedPassword = await hashPasswordBcrypt(data.password);

    const engagedData = {
      ...data,
      password: hashedPassword,
    };

    const engaged = await prisma.engaged.create({
      data: engagedData,
    });

    const { password, ...responseEngaged } = engaged;

    return responseEngaged;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getEngaged = async () => {
  try {
    const engaged = await prisma.engaged.findMany({});
    return engaged;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getEngagedByName = async (name) => {
  try {
    const engaged = await prisma.$queryRawUnsafe(
      'SELECT * FROM "Engaged" WHERE (groom_name ILIKE $1 OR bride_name ILIKE $1)',
      `%${name}%`
    );
    return engaged;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateEngaged = async (id, data) => {
  try {
    const engaged = await prisma.engaged.update({
      where: {
        id,
      },
      data,
    });
    return engaged;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateEngagedPassword = async (
  id,
  password,
  newPassword,
  confirmPassword
) => {
  try {
    const engaged = await prisma.engaged.findUnique({
      where: {
        id,
      },
    });

    if (!engaged) {
      throw new Error("Usuário não encontrado");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    const isValidPassword = await comparePasswords(password, engaged.password);

    if (!isValidPassword) {
      throw new Error("Senha atual incorreta");
    }

    const hashedPassword = await hashPasswordBcrypt(newPassword);

    const updatedEngaged = await prisma.engaged.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    const { password: updatedPassword, ...responseEngaged } = updatedEngaged;

    return responseEngaged;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};
