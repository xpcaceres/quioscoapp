import { PrismaClient } from "@prisma/client"

export default async function hanler(req,res){

    const prisma = new PrismaClient();

    if(req.method === 'POST'){
        const {id} = req.query

        const ordenActualizada = await prisma.orden.update({
            where:{
                id: parseInt(id)
            },
            data:{
                estado: true
            }
        })
        res.status(200).json(ordenActualizada)
    }
}