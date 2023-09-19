import {
  createEngaged,
  getEngaged,
  getEngagedById,
} from "../repositorys/engaged.repository";
import { engagedValidation } from "../validations/engaged.validations";

export const createEngagedController = async (req, res) => {
  try {
    await engagedValidation.validate(req.body);
    const engaged = await createEngaged(req.body);
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getEngagedController = async (req, res) => {
  try {
    const engaged = await getEngaged();
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getEngagedByIdController = async (req, res) => {
  try {
    const engaged = await getEngagedById(Number(req.params.id));
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};
