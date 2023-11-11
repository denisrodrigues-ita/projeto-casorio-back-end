import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};

export const authenticateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: "Token mal formatado" });
    }

    const decoded = verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
