import {
  createGuest,
  getGuests,
  updateGuest,
  deleteGuest,
} from "../repositorys/guests.repository.js";
import { guestsValidation } from "../validations/guests.validations.js";

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
    const guests = await getGuests(Number(req.params.engaged_id));
    res.status(200).send(guests);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateGuestController = async (req, res) => {
  try {
    const guest = await updateGuest(req.params.code, req.body);
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send({ message: "Código inválido.", error: error.message });
  }
};

export const deleteGuestController = async (req, res) => {
  try {
    const guest = await deleteGuest(Number(req.params.id));

    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};
