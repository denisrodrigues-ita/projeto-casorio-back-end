"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _routes = _interopRequireDefault(require("./routes"));
var _init = require("./scripts/init");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
(0, _routes["default"])(app);
app.listen(3001);
(0, _init.createFirstEngaged)();