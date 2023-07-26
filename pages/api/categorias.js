import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//al utilizar include estamos haciendo 'Eager Loading' osea cargando todo en una sola consulta
//Funciona bien para aplicaciones sencilla con pocos registros
export default async function handler(req, res) {

  const categorias = await prisma.categoria.findMany({
    include:{
      productos: true,
    }
  });

  res.status(200).json(categorias);
};
