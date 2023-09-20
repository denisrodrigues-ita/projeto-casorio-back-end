import {
  createEngagedController,
  getEngagedController,
  getEngagedByIdController,
  updateEngagedController,
} from "../controllers/engaged.controller";

const engagedRouter = (app) => {
  app.post("/engaged", createEngagedController);
  app.get("/engaged", getEngagedController);
  app.get("/engaged/:id", getEngagedByIdController);
  app.put("/engaged/:id", updateEngagedController);
};

export default engagedRouter;
