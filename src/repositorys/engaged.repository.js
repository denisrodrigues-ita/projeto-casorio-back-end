import { prisma } from "../services/prisma";

export const createEngaged = async (data) => {
  const engaged = await prisma.engaged.create({
    data,
  });
  return engaged;
};
