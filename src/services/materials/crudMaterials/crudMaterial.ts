import { url } from "inspector";
import prisma from "../../../config/db";
import { CustomError } from "../../../cutomErrorhandler/authError";
import { materialType, materialUpdateType } from "../../../types/type";
import path from "path";
import { deleteImg } from "../../../utilities/helper";
export const createMaterial = async (materialDetail: materialType) => {
  console.log(materialDetail);
  const result = await prisma.$transaction(async (tx) => {
    const mat = await tx.materials.create({
      data: {
        name: materialDetail.name,
        user_id: Number(materialDetail.user_id),
        description: materialDetail.description,
        category: materialDetail.category,
        price: Number(materialDetail.price),
        quantity: Number(materialDetail.quantity),
        address: materialDetail.address,
      },
    });

    await tx.material_images.create({
      data: {
        url_0: materialDetail.material_images.url_0,
        url_1: materialDetail.material_images.url_1,
        url_2: materialDetail.material_images.url_2,
        alt_text: materialDetail.material_images.alt_text,
        material_id: mat.material_id,
      },
    });

    return mat;
  });

  return result;
};

export const updateMaterial = async (material: materialUpdateType) => {
  const { material_id, material_images, ...materialData } = material;

  const result = await prisma.$transaction(async (tx) => {
    await tx.materials.update({
      where: { material_id },
      data: materialData,
    });
    if (material_images) {
      await tx.material_images.update({
        where: { material_id: material_id },
        data: {
          ...(material_images.url_0 !== undefined && {
            url_0: material_images.url_0,
          }),
          ...(material_images.url_1 !== undefined && {
            url_1: material_images.url_1,
          }),
          ...(material_images.url_2 !== undefined && {
            url_2: material_images.url_2,
          }),
          ...(material_images.alt_text !== undefined && {
            alt_text: material_images.alt_text,
          }),
        },
      });
    }

    return true;
  });

  if (!result)
    throw new CustomError(
      "Error while updating the product. Please check your data.",
      400
    );

  return result;
};
export const removeMaterial = async (material_id: number) => {
  const material = await prisma.materials.findUnique({
    where: { material_id },
  });
  if (!material)
    throw new CustomError("No material found based on ur input", 404);
  const result = await prisma.materials.delete({
    where: { material_id },
  });
  if (result) return true;
  return false;
};

export const handleFavorite = async (material_id: number, user_id: number) => {
  try {
    const existing = await prisma.favorites.findFirst({
      where: {
        user_id,
        material_id,
      },
    });
    if (existing) {
      await prisma.favorites.delete({
        where: { favorite_id: existing.favorite_id },
      });
      return true;
    }
    await prisma.favorites.create({
      data: {
        user_id,
        material_id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
