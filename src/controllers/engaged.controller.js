import {
  createEngaged,
  getEngaged,
  getEngagedByName,
  updateEngaged,
  updateEngagedPassword,
} from "../repositorys/engaged.repository";
import { engagedValidation } from "../validations/engaged.validations";

export const createEngagedController = async (req, res) => {
  try {
    await engagedValidation.validate(req.body);

    const engaged = await createEngaged(req.body);

    const { password, ...responseEngaged } = engaged;

    res.status(200).send(responseEngaged);
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

export const getEngagedByNameController = async (req, res) => {
  try {
    const engaged = await getEngagedByName(req.params.name);
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateEngagedController = async (req, res) => {
  try {
    const engaged = await updateEngaged(Number(req.params.id), req.body);
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateEngagedPasswordController = async (req, res) => {
  try {
    const engaged = await updateEngagedPassword(req, res);
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};
