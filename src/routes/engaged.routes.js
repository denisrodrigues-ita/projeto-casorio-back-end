import { createEngagedController } from "../controllers/engaged.controller";

const engagedRouter = (app) => {
  app.post("/engaged", createEngagedController);
};

export default engagedRouter;
