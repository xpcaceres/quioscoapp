import { PrismaClient } from "@prisma/client";
 

export default async function handlerC(req, res){
    const prisma = new PrismaClient();

    //OBTENER ORDENES CONCLUIDAS
    const ordenesConcluidas = await prisma.orden.findMany({
        where: {
            estado: true   
        }
    });
    res.status(200).json(ordenesConcluidas); 

    //CREAR ORDENES
    if(req.method === 'POST'){
        const ordenC = await prisma.orden.create({
            data:{
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            },
        });
        res.status(200).json(ordenC);
    }
    
}