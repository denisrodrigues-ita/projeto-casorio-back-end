import bcrypt from "bcrypt";
import { prisma } from "../services/prisma";

export const createEngaged = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const engagedData = {
    ...data,
    password: hashedPassword,
  };

  const engaged = await prisma.engaged.create({
    data: engagedData,
  });

  const { password, ...responseEngaged } = engaged;

  return responseEngaged;
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
