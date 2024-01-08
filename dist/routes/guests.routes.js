"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _guests = require("../controllers/guests.controller");
var _auth = require("../middleware/auth.middleware");
var guestsRouter = function guestsRouter(app) {
  app.post("/guests", _auth.authenticateToken, _guests.createGuestController);
  app.get("/guests/:engaged_id", _auth.authenticateToken, _guests.getGuestsController);
  app.get("/guests/:engaged_id/:name", _guests.getGuestByIdController);
  app.put("/guests/:code", _auth.authenticateToken, _guests.updateGuestController);
  app.put("/guests/public/:code", _guests.updateGuestController);
  app["delete"]("/guests/:id", _guests.deleteGuestController);
};
var _default = exports["default"] = guestsRouter;