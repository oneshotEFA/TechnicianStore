import express, { Request, Response } from "express";
import routes from "./routes/index";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
