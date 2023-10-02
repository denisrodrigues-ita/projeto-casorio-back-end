import {
  createGuestController,
  getGuestsController,
  getGuestByIdController,
  updateGuestController,
} from "../controllers/guests.controller";

const guestsRouter = (app) => {
  app.post("/guests", createGuestController);
  app.get("/guests", getGuestsController);
  app.get("/guests/:id/:name", getGuestByIdController);
  app.put("/guests/:id/:name", updateGuestController);
};

export default guestsRouter;
