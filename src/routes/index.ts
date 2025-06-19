import { Router } from "express";
import authRoutes from "./auth/auth.route";
import materialRoutes from "./material/fetch/fetchMaterial.Routes";
import crudRoutes from "./material/curd/crudMaterial.Routes";
const router = Router();
router.use("/auth", authRoutes);
router.use("/material", materialRoutes);
router.use("/crud", crudRoutes);
export default router;
