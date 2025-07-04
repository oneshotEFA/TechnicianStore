import prisma from "../../../../config/db";
import { CustomError } from "../../../../cutomErrorhandler/authError";

export const similarMaterial = async (query: string) => {
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
    const materials = await prisma.materials.findMany({
      where: {
        material_id: { in: materialIds },
      },
      include: {
        material_images: true,
      },
    });
    if (materials.length === 0) {
      console.log("No similar product found");
      return null;
    }
    return materials;
  } catch (error) {
    console.log(error);
    throw new CustomError("No similar material found", 404);
  }
};
