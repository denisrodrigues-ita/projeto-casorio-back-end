import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
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
    const guests = await getGuests(Number(req.params.engaged_id));
    res.status(200).send(guests);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getGuestByIdController = async (req, res) => {
  try {
    const guest = await getGuestById(
      Number(req.params.engaged_id),
      req.params.name
    );
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateGuestController = async (req, res) => {
  try {
    const guest = await updateGuest(req.params.code, req.body);
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteGuestController = async (req, res) => {
  try {
    await deleteGuest(Number(req.params.id));
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(400).send(error);
  }
};
