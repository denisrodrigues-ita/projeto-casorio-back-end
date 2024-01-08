import {
  createEngaged,
  getEngaged,
  updateEngaged,
  updateEngagedPassword,
} from "../repositorys/engaged.repository";
import { engagedValidation } from "../validations/engaged.validations";

export const createEngagedController = async (req, res) => {
  try {
    const { groomName, brideName, password, confirmPassword, email } =
      req.body.engaged;

    await engagedValidation.validate({
      groomName,
      brideName,
      password,
      confirmPassword,
      email,
    });

    const engaged = await createEngaged(req.body);

    const { password: engagedPassword, ...responseEngaged } = engaged;

    res.status(200).send(responseEngaged);
  } catch (error) {
    res.status(400).send({ error: error.message });
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
