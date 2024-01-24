import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { createFirstEngaged } from "./scripts/init.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on port ${process.env.PORT || 3001}`);
});

createFirstEngaged();

export default app;
