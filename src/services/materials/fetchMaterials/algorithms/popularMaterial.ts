import prisma from "../../../../config/db";

export const popularMaterial = async () => {
  const matIds = await prisma.counter.findMany({
    orderBy: { count: "desc" },
  });

  const materialIds = matIds.map((mat) => mat.material_id);

  if (materialIds.length === 0) {
    console.log("No popular material found");
    return [];
  }
  const materialDetails = await prisma.materials.findMany({
    where: {
      material_id: {
        in: materialIds,
      },
    },
    include: {
      material_images: true,
    },
  });
  return materialDetails;
};
