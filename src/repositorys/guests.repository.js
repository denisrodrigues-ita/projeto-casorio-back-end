import { prisma } from "../services/prisma";

export const createGuest = async (data) => {
  const guest = await prisma.guests.create({
    data,
  });
  return guest;
};

export const getGuests = async () => {
  const guests = await prisma.guests.findMany({});
  return guests;
};

export const getGuestById = async (id) => {
  const guest = await prisma.guests.findUnique({
    where: {
      id,
    },
  });
  return guest;
};

export const updateGuest = async (id, data) => {
  const guest = await prisma.guests.update({
    where: {
      id,
    },
    data,
  });
  return guest;
};
