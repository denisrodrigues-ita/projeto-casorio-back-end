import {
  createGuestController,
  getGuestsController,
  updateGuestController,
  deleteGuestController,
} from "../controllers/guests.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const guestsRouter = (app) => {
  app.post("/guests", authenticateToken, createGuestController);
  app.get("/guests/:engaged_id", authenticateToken, getGuestsController);
  app.put("/guests/:code", authenticateToken, updateGuestController);
  app.put("/guests/public/:code", updateGuestController);
  app.delete("/guests/:id", authenticateToken, deleteGuestController);
};

export default guestsRouter;
