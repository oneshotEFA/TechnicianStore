import prisma from "../../../config/db";
import { CustomError } from "../../../cutomErrorhandler/authError";

export const getSingleMaterial = async (material_id: number) => {
  const material = await prisma.materials.findUnique({
    where: { material_id: material_id },
    include: {
      material_images: true,
    },
  });
  if (!material) throw new CustomError("Material not found", 404);
  return material;
};

export const getAllMaterials = async () => {
  const materials = await prisma.materials.findMany({
    where: { status: "available" },
    include: {
      material_images: true,
    },
  });
  if (materials.length === 0) throw new CustomError("No material found", 404);
  return materials;
};

export const getMaterialsByUser = async (user_id: number) => {
  const materials = await prisma.materials.findMany({
    where: { user_id: user_id },
    include: {
      material_images: true,
    },
  });
  if (materials.length === 0)
    throw new CustomError("No material found for this user", 404);
  return materials;
};
