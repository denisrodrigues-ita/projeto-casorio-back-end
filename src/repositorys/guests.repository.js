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

export const getGuests = async (engaged_id, sort, asc) => {
  try {
    let orderBy = {};

    if (sort) {
      orderBy = {
        [sort]: asc,
      };
    }

    const guests = await prisma.guests.findMany({
      where: {
        engaged_id,
      },
      orderBy,
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

export const updateGuest = async (code, data) => {
  try {
    const findGuest = await prisma.guests.findFirst({
      where: {
        OR: [
          { AND: [{ name: code }, { engaged_id: parseInt(data.engaged_id) }] },
          { code },
        ],
      },
    });

    const guest = await prisma.guests.update({
      where: {
        id: findGuest.id,
      },
      data: {
        attendance_status: data.attendance_status,
      },
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
