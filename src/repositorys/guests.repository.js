import { prisma } from "../services/prisma";

export const createGuest = async (data) => {
  const guest = await prisma.guests.create({
    data,
  });
  return guest;
};

export const getGuests = async (engaged_id) => {
  const guests = await prisma.guests.findMany({
    where: {
      engaged_id,
    },
  });

  const totalGuests = await prisma.guests.count({
    where: {
      engaged_id,
    },
  });

  const attendanceCount = await prisma.guests.count({
    where: {
      engaged_id,
      attendance_status: true,
    },
  });

  return { guests, totalGuests, attendanceCount };
};

export const getGuestById = async (engaged_id, name) => {
  const guest = await prisma.$queryRawUnsafe(
    'SELECT * FROM "Guests" WHERE (engaged_id = $1 AND name ILIKE $2)',
    engaged_id,
    `%${name}%`
  );
  return guest;
};

export const updateGuest = async (code, data) => {
  const guest = await prisma.guests.update({
    where: {
      code,
    },
    data,
  });
  return guest;
};

export const deleteGuest = async (id) => {
  const guest = await prisma.guests.delete({
    where: {
      id,
    },
  });
  return guest;
};
