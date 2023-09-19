import { createEngaged } from "../repositorys/engaged.repository";

export const createEngagedController = async (req, res) => {
  try {
    const engaged = await createEngaged(req.body);
    res.status(200).send(engaged);
  } catch (error) {
    res.status(400).send(error);
  }
};
