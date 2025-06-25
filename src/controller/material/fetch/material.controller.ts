import { Request, Response } from "express";
import { CustomError } from "../../../cutomErrorhandler/authError";
import * as materialFetch from "../../../services/materials/fetchMaterials/materialFetchs";

export const getSingleMaterialController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const material_id = Number(req.query.material_id);
  const user_id = Number(req.query.user_id);
  try {
    const { actualMaterial, similarMaterial } =
      await materialFetch.getSingleMaterial(
        Number(material_id),
        Number(user_id)
      );

    const is_favorite = actualMaterial?.favorites.length > 0;
    res.status(200).json({
      message: "fetched",
      success: true,
      fetchedMaterial: actualMaterial,
      similarMaterials: similarMaterial,
      is_favorite: is_favorite,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, success: false, fetchedMaterial: null });
    }
    res.status(500).json({
      success: false,
      message: "internal server error",
      fetchedMaterial: null,
    });
  }
};

export const getAllMaterialsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const materials = await materialFetch.getAllMaterials();
    res
      .status(200)
      .json({ message: "fetched", success: true, fetchedMaterial: materials });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        message: err.message,
        success: false,
        fetchedMaterial: null,
      });
    }
    res.status(500).json({
      success: false,
      message: "internal server error",
      fetchedMaterial: null,
    });
  }
};

export const getMaterialsByUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const user_id = Number(req.params.user_id);
  if (isNaN(user_id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const materials = await materialFetch.getMaterialsByUser(user_id);
    res
      .status(200)
      .json({ message: "fetched", success: true, fetchedMaterial: materials });
  } catch (err) {
    if (err instanceof CustomError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, success: false, fetchedMaterial: null });
    }
    res.status(500).json({
      success: false,
      message: "internal server error",
      fetchedMaterial: null,
    });
  }
};
export const getMaterialByQueryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query = req.params.query;
    const materials = await materialFetch.getMaterialByQuery(query);

    return res.status(200).json({
      message: "Query fetched",
      success: true,
      fetchedMaterial: materials,
    });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        fetchedMaterial: null,
      });
    }
    res.status(500).json({
      success: false,
      message: "internal server error",
      fetchedMaterial: null,
    });
  }
};
