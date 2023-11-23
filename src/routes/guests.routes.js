import {
  createGuestController,
  getGuestsController,
  getGuestByIdController,
  updateGuestController,
  deleteGuestController,
} from "../controllers/guests.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const guestsRouter = (app) => {
  app.post("/guests", authenticateToken, createGuestController);
  app.get("/guests/:engaged_id", getGuestsController);
  app.get("/guests/:engaged_id/:name", getGuestByIdController);
  app.put("/guests/:code", authenticateToken, updateGuestController);
  app.delete("/guests/:id", deleteGuestController);
};

export default guestsRouter;
