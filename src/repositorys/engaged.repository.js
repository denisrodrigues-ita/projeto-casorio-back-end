import { comparePasswords, hashPasswordBcrypt } from "../utils";
import { prisma } from "../services/prisma";

export const createEngaged = async (data) => {
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

    const engaged = await prisma.engaged.create({
      data: {
        bride_name: engagedData.brideName,
        groom_name: engagedData.groomName,
        email: engagedData.email,
        password: engagedData.password,
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
    const engaged = await prisma.engaged.findMany({});
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
    const confirmPassword = req.body.confirmPassword;
    const id = req.userData.userId;

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
