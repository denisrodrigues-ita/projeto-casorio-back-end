"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _engagedRoutes = _interopRequireDefault(require("./engaged.routes.js"));
var _guestsRoutes = _interopRequireDefault(require("./guests.routes.js"));
var _authRoutes = _interopRequireDefault(require("./auth.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = function routes(app) {
  (0, _engagedRoutes["default"])(app);
  (0, _guestsRoutes["default"])(app);
  (0, _authRoutes["default"])(app);
};
var _default = exports["default"] = routes;