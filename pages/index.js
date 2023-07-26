import Head from 'next/head';
import Image from 'next/image';
import Layout from '../layout/layout';
import Producto from '../components/Producto';
import useQuiosco from '../hooks/useQuiosco';


//import { PrismaClient } from '@prisma/client';
//Tambien quitamos el {categorias} de export default function Home({categorias}) {

export default function Home() {

  const { categoriaActual } = useQuiosco();

  return(
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-10'>
        Eligue y personaliza tu pedido a continuación: 
      </p>
      <div className='grid g-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categoriaActual?.productos?.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </Layout>
  );
}
/*
export const getServerSideProps = async ()=> {

  const prisma = new PrismaClient();

  const categorias = await prisma.categoria.findMany();

  return{
    props:{
      categorias,
    },
  };
};
*/
