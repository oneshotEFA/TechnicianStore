import {
  createMaterial,
  handleFavorite,
  removeMaterial,
  updateMaterial,
} from "../../../services/materials/crudMaterials/crudMaterial";
import { Request, Response } from "express";
import { CustomError } from "../../../cutomErrorhandler/authError";

export const createMaterialController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      name,
      user_id,
      description,
      category,
      price,
      quantity,
      alt_text,
      address,
    } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const materialDetail = {
      name,
      user_id: Number(user_id),
      description,
      category,
      price: Number(price),
      quantity: Number(quantity),
      address,
      material_images: {
        url_0: files.url_0[0].path,
        url_1: files.url_1 ? files.url_1[0].path : undefined,
        url_2: files.url_2 ? files.url_2[0].path : undefined,
        alt_text,
      },
    };

    await createMaterial(materialDetail);
    return res
      .status(200)
      .json({ success: true, message: "material created successfully" });
  } catch (error) {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};
type updateing = {
  material_id: number;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  alt_text?: string;
  status?: string;
  address?: string;
};

export const updateMaterialController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const update: updateing = req.body;

    const filepaths = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const updateDetail = {
      material_id: Number(update.material_id),
      name: update.name,
      status: update.status,
      description: update.description,
      price: update.price ? Number(update.price) : undefined,
      quantity: update.quantity ? Number(update.quantity) : undefined,
      address: update.address,
      material_images: {
        material_id: Number(update.material_id),
        url_0: filepaths?.url_0?.[0]?.path,
        url_1: filepaths?.url_1?.[0]?.path,
        url_2: filepaths?.url_2?.[0]?.path,
        alt_text: update.alt_text,
      },
    };

    await updateMaterial(updateDetail);
    return res
      .status(202)
      .json({ message: "material info updated successfully" });
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error);
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
export const removeMaterialController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const { material_id } = id;
    const result = await removeMaterial(Number(material_id));
    if (result) return res.status(201).json({ message: "delete successfully" });
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error);
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "internal server Error" });
  }
};
export const handleFavoriteController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { material_id, user_id } = req.body;
    await handleFavorite(Number(material_id), Number(user_id));
    return res.status(201).json({ success: true, message: "added to fav" });
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ success: false, message: error?.message });
  }
};
