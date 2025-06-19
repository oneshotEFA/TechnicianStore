import { Router } from "express";
import * as crudController from "../../../controller/material/crud/materialCrud.controller";
import { upload } from "../../../middleware/multer";
import { verifyToken } from "../../../middleware/verifyToken";

const router = Router();

router.delete(
  "/post/delete/:material_id",
  crudController.removeMaterialController
);
router.post(
  "/post",
  verifyToken,
  upload.fields([
    { name: "url_0", maxCount: 1 },
    { name: "url_1", maxCount: 1 },
    { name: "url_2", maxCount: 1 },
  ]),
  crudController.createMaterialController
);
router.post(
  "/post/update",
  upload.fields([
    { name: "url_0", maxCount: 1 },
    { name: "url_1", maxCount: 1 },
    { name: "url_2", maxCount: 1 },
  ]),
  crudController.updateMaterialController
);

export default router;
