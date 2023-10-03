import {
  createEngagedController,
  getEngagedController,
  getEngagedByNameController,
  updateEngagedController,
} from "../controllers/engaged.controller";

const engagedRouter = (app) => {
  app.post("/engaged", createEngagedController);
  app.get("/engaged", getEngagedController);
  app.get("/engaged/:name", getEngagedByNameController);
  app.put("/engaged/:id", updateEngagedController);
};

export default engagedRouter;
