import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createFirstEngaged = async () => {
  try {
    const engagedCount = await prisma.engaged.count();

    if (engagedCount === 0) {
      await prisma.engaged.create({
        data: {
          password: await bcrypt.hash("111111", 10),
          groom_name: "Denis Rodrigues dos Santos",
          bride_name: "Leticia Sabioni Yamin",
          email: "denisrodrigues.ita@gmail.com",
          active: true,
          role: "admin",
          end_date: new Date(2100, 1, 1),
        },
      });

    }
  } catch (error) {
    console.error("Erro ao criar o primeiro Engaged:", error);
  } finally {
    await prisma.$disconnect();
  }
};
