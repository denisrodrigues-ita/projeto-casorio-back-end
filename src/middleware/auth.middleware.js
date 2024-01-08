import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const formatedToken = token?.replace(/["']/g, "");
    const decoded = jwt.verify(formatedToken, process.env.JWT_SECRET);
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

    const tokenParts = authorization.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Token inválido" });
    }

    const token = tokenParts[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
