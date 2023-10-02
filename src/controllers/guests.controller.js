import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
} from "../repositorys/guests.repository";
import { guestsValidation } from "../validations/guests.validations";

export const createGuestController = async (req, res) => {
  try {
    await guestsValidation.validate(req.body);
    const guest = await createGuest(req.body);
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getGuestsController = async (req, res) => {
  try {
    const guests = await getGuests();
    res.status(200).send(guests);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getGuestByIdController = async (req, res) => {
  try {
    const guest = await getGuestById(Number(req.params.id));
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateGuestController = async (req, res) => {
  try {
    const guest = await updateGuest(Number(req.params.id), req.body);
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};
