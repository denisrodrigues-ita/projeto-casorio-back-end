import {
  createGuestController,
  getGuestsController,
  getGuestByIdController,
  updateGuestController,
  deleteGuestController,
} from "../controllers/guests.controller";

const guestsRouter = (app) => {
  app.post("/guests", createGuestController);
  app.get("/guests/:engaged_id", getGuestsController);
  app.get("/guests/:engaged_id/:name", getGuestByIdController);
  app.put("/guests/:code", updateGuestController);
  app.delete("/guests/:id", deleteGuestController);
};

export default guestsRouter;
