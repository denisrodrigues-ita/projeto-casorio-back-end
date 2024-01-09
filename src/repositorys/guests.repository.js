import { prisma } from "../services/prisma.js";

export const createGuest = async (data) => {
  try {
    const guest = await prisma.guests.create({
      data,
    });
    return guest;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getGuests = async (engaged_id) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getGuestById = async (engaged_id, name) => {
  try {
    const guest = await prisma.$queryRawUnsafe(
      'SELECT * FROM "Guests" WHERE (engaged_id = $1 AND name ILIKE $2)',
      engaged_id,
      `%${name}%`
    );
    return guest;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateGuest = async (code, data) => {
  try {
    const guest = await prisma.guests.update({
      where: {
        code,
      },
      data,
    });
    return guest;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteGuest = async (id) => {
  try {
    const guest = await prisma.guests.delete({
      where: {
        id,
      },
    });
    return guest;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};
