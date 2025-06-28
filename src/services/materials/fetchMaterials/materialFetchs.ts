import prisma from "../../../config/db";
import { CustomError } from "../../../cutomErrorhandler/authError";
import { counter } from "./algorithms/couter";
import { similarMaterial } from "./algorithms/similarMaterial";

export const getSingleMaterial = async (
  material_id: number,
  user_id: number
) => {
  const material = await prisma.materials.findUnique({
    where: { material_id: material_id },
    include: {
      material_images: true,
      favorites: {
        where: { user_id: user_id },
      },
    },
  });
  const similarMat = await similarMaterial(material?.name || "");
  if (!material) throw new CustomError("Material not found", 404);
  return {
    actualMaterial: material,
    similarMaterial: similarMat,
  };
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

export const getMaterialByQuery = async (query: string) => {
  try {
    const fuzzyMatchedMaterials = await prisma.$queryRawUnsafe<any[]>(
      `
      SELECT *
      FROM "materials"
      WHERE similarity(name, $1) > 0.2
         OR similarity(description, $1) > 0.2
      ORDER BY GREATEST(similarity(name, $1), similarity(description, $1)) DESC
      LIMIT 7;
      `,
      query
    );

    const materialIds = fuzzyMatchedMaterials.map((m) => m.material_id);
    materialIds.map((id) => counter(id));
    const materialsWithImages = await prisma.materials.findMany({
      where: {
        material_id: { in: materialIds },
      },
      include: {
        material_images: true,
      },
    });

    if (materialsWithImages.length === 0) {
      console.log("nomaterial");
    }

    return materialsWithImages;
  } catch (error: any) {
    console.log(error);
    throw new CustomError("No material found", 404);
  }
};
export const getFavoriteMaterial = async (user_id: number) => {
  try {
    const material_ids = await prisma.favorites.findMany({
      where: { user_id: user_id },
      select: {
        material_id: true,
      },
    });
    const ids = material_ids.map((s) => s.material_id);
    const favMaterial = await prisma.materials.findMany({
      where: { material_id: { in: ids } },
      include: {
        material_images: true,
      },
    });
    const length = favMaterial.length;
    return {
      Amount: length,
      FavMaterials: favMaterial,
    };
  } catch (error: any) {
    console.log(error);
    throw new CustomError(error, 400);
  }
};
