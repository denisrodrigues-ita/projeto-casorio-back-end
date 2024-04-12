import { comparePasswords, hashPasswordBcrypt, formatDateToISO } from "../utils/index.js";
import { prisma } from "../services/prisma.js";

export const createEngaged = async (data) => {
  const [day, month, year] = data.engaged.end_date.split("/");
  try {
    if (data.engaged.password !== data.engaged.confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    const hashedPassword = await hashPasswordBcrypt(data.engaged.password);

    const engagedData = {
      ...data.engaged,
      password: hashedPassword,
    };

    delete engagedData.confirmPassword;

    console.log(formatDateToISO(engagedData.end_date))

    const engaged = await prisma.engaged.create({
      data: {
        bride_name: engagedData.brideName,
        groom_name: engagedData.groomName,
        email: engagedData.email,
        password: engagedData.password,
        end_date: formatDateToISO(engagedData.end_date),
      },
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
    const engaged = await prisma.engaged.findMany({
      select: {
        active: true,
        bride_name: true,
        created_at: true,
        email: true,
        first_access: true,
        update_at: true,
        groom_name: true,
        id: true,
        role: true,
        end_date: true
      },
      orderBy: {
        groom_name: "asc",
      }
    });

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

export const updateEngagedPassword = async (req) => {
  try {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.newConfirmPassword;
    const id = req.body.id;

    const engaged = await prisma.engaged.findUnique({
      where: {
        id,
      },
    });

    if (!engaged) {
      throw new Error("Usuário não encontrado");
    }

    if (password === newPassword) {
      throw new Error("A nova senha não pode ser igual a senha atual");
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
        first_access: false,
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
