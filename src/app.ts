import express, { Request, Response } from "express";
import routes from "./routes/index";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
