import { authenticateUserController } from '../controllers/auth.controller';

const authRouter = (app) => {
  app.post("/authenticate", authenticateUserController);
};

export default authRouter;
