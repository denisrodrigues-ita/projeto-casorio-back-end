import {
  createEngagedController,
  getEngagedController,
  getEngagedByNameController,
  updateEngagedController,
  updateEngagedPasswordController,
} from "../controllers/engaged.controller";

const engagedRouter = (app) => {
  app.post("/engaged", createEngagedController);
  app.get("/engaged", getEngagedController);
  app.get("/engaged/:name", getEngagedByNameController);
  app.put("/engaged/:id", updateEngagedController);
  app.put("/engaged/password/:id", updateEngagedPasswordController);
};

export default engagedRouter;
