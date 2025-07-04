import { Router } from "express";
import * as crudController from "../../../controller/material/crud/materialCrud.controller";
import { upload } from "../../../middleware/multer";
import { verifyToken } from "../../../middleware/verifyToken";

const router = Router();

router.delete(
  "/post/delete/:material_id",
  crudController.removeMaterialController
);
router.post("/post", verifyToken, crudController.createMaterialController);
router.post("/post/update", crudController.updateMaterialController);
router.post("/favorite", verifyToken, crudController.handleFavoriteController);
export default router;
