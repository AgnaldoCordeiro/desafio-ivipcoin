import express from "express";
import cors from "cors";
import { authenticated, tasks, user } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(authenticated);
app.use(tasks);
app.use(user);

app.listen(3344, () => {
  console.log("Server listening on port 3344");
});
