import {
  createEngagedController,
  getEngagedController,
  getEngagedByIdController,
} from "../controllers/engaged.controller";

const engagedRouter = (app) => {
  app.post("/engaged", createEngagedController);
  app.get("/engaged", getEngagedController);
  app.get("/engaged/:id", getEngagedByIdController);
};

export default engagedRouter;
