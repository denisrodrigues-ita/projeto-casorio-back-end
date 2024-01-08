import engagedRouter from "./engaged.routes.js";
import guestsRouter from "./guests.routes.js";
import authRouter from "./auth.routes.js";

const routes = (app) => {
  engagedRouter(app);
  guestsRouter(app);
  authRouter(app)
};

export default routes;
