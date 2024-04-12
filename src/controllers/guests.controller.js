import {
  createGuest,
  getGuests,
  updateGuest,
  deleteGuest,
} from "../repositorys/guests.repository.js";
import langErrors from "../lang/index.js";
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
  const { sort, asc } = req.query;
  const { engaged_id } = req.params;
  try {
    const guests = await getGuests(Number(engaged_id), sort, asc);
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
    if (error.message === `Error: ${langErrors.dataLimite}`) {
      res.status(400).send({ message: langErrors.dataLimite });
    } else {
      res.status(400).send({ message: "Código inválido." });
    }
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
