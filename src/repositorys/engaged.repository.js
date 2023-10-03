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

export const getEngagedByName = async (name) => {
  const engaged = await prisma.$queryRawUnsafe(
    'SELECT * FROM "Engaged" WHERE (groom_name ILIKE $1 OR bride_name ILIKE $1)',
    `%${name}%`
  );
  return engaged;
};

export const updateEngaged = async (id, data) => {
  const engaged = await prisma.engaged.update({
    where: {
      id,
    },
    data,
  });
  return engaged;
};
