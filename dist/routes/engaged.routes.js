"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _engaged = require("../controllers/engaged.controller");
var _auth = require("../middleware/auth.middleware");
var engagedRouter = function engagedRouter(app) {
  app.post("/engaged", _auth.authenticateToken, _engaged.createEngagedController);
  app.get("/engaged", _engaged.getEngagedController);
  app.put("/engaged/:id", _engaged.updateEngagedController);
  app.put("/engaged/password/change", _auth.authenticateToken, _engaged.updateEngagedPasswordController);
};
var _default = exports["default"] = engagedRouter;