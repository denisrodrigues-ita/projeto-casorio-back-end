import {
  authenticateUserController,
  userVerificationController,
} from "../controllers/auth.controller.js";

const authRouter = (app) => {
  app.post("/authenticate", authenticateUserController);
  app.get("/user-verify", userVerificationController);
};

export default authRouter;
