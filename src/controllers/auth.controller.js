import {
  authenticateUser,
  userVerification,
} from "../repositorys/auth.repository";
import { generateToken } from "../middleware/auth.middleware";
import { authValidation } from "../validations/auth.validations";

export const authenticateUserController = async (req, res) => {
  try {
    await authValidation.validate(req.body);

    const user = await authenticateUser(req.body.email, req.body.password);

    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha incorreta" });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const userVerificationController = async (req, res) => {
  try {
    const { user, token } = await userVerification(req);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
};
