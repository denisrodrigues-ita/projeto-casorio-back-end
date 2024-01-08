"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = exports.authenticateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateToken = exports.generateToken = function generateToken(user) {
  var token = _jsonwebtoken["default"].sign(user, process.env.JWT_SECRET, {
    expiresIn: "8h"
  });
  return token;
};
var verifyToken = exports.verifyToken = function verifyToken(token) {
  try {
    var formatedToken = token === null || token === void 0 ? void 0 : token.replace(/["']/g, "");
    var decoded = _jsonwebtoken["default"].verify(formatedToken, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};
var authenticateToken = exports.authenticateToken = function authenticateToken(req, res, next) {
  try {
    var authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Token não fornecido"
      });
    }
    var tokenParts = authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({
        message: "Token inválido"
      });
    }
    var token = tokenParts[1];
    var decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({
        message: "Token inválido"
      });
    }
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token inválido"
    });
  }
};