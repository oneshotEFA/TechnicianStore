import { Router } from "express";
import * as fetchController from "../../../controller/material/fetch/material.controller";
import { verifyToken } from "../../../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, fetchController.getAllMaterialsController);
router.get(
  "/by-user/:user_id",
  verifyToken,
  fetchController.getMaterialsByUserController
);
router.get(
  "/singleMaterial",
  verifyToken,
  fetchController.getSingleMaterialController
);
router.get(
  "/search/:query",
  verifyToken,
  fetchController.getMaterialByQueryController
);

export default router;
