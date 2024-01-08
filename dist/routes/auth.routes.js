"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _auth = require("../controllers/auth.controller");
var authRouter = function authRouter(app) {
  app.post("/authenticate", _auth.authenticateUserController);
  app.get("/user-verify", _auth.userVerificationController);
};
var _default = exports["default"] = authRouter;