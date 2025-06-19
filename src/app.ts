import express, { Request, Response } from "express";
import routes from "./routes/index";
import path from "path";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
