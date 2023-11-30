import {
  createEngagedController,
  getEngagedController,
  getEngagedByNameController,
  updateEngagedController,
  updateEngagedPasswordController,
} from "../controllers/engaged.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const engagedRouter = (app) => {
  app.post("/engaged", authenticateToken, createEngagedController);
  app.get("/engaged", getEngagedController);
  app.get("/engaged/:name", getEngagedByNameController);
  app.put("/engaged/:id", updateEngagedController);
  app.put("/engaged/password/change", authenticateToken, updateEngagedPasswordController);
};

export default engagedRouter;
