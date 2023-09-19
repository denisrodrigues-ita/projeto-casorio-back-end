import { prisma } from "../services/prisma";

export const createEngaged = async (data) => {
  const engaged = await prisma.engaged.create({
    data,
  });
  return engaged;
};

export const getEngaged = async () => {
  const engaged = await prisma.engaged.findMany({});
  return engaged;
};

export const getEngagedById = async (id) => {
  const engaged = await prisma.engaged.findUnique({
    where: {
      id,
    },
  });
  return engaged;
}