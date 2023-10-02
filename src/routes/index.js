import engagedRouter from "./engaged.routes.js";
import guestsRouter from "./guests.routes.js";

const routes = (app) => {
  engagedRouter(app);
  guestsRouter(app);
};

export default routes;
