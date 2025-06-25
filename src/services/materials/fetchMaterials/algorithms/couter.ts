import prisma from "../../../../config/db";

export const counter = async (material_id: number) => {
  const existing = await prisma.counter.findUnique({
    where: { material_id },
  });

  if (existing)
    await prisma.counter.update({
      where: { material_id },
      data: {
        count: { increment: 1 },
      },
    });
  else
    await prisma.counter.create({
      data: {
        material_id,
        count: 1,
      },
    });
};
