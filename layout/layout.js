import Head from "next/head";
import { Children } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/sidebar";
import Pasos from "../components/Pasos";
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hooks/useQuiosco";

import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    rigth: 'auto',
    bottom: 'auto',
    marginRigth: '-50%',
    transform: 'translate(-50%,-50%)',
  },
};
/*
//Si utilizamos Vite es:
Modal.setAppElement("#root");
*/
//Si utilizamos Next es:
Modal.setAppElement("#__next");

export default function Layout({children, pagina}) {

  const{modal} = useQuiosco() 

    return (
      <>
        <Head>
            <title>Café - {pagina}</title>
            <meta name="description" content="Quiosco Cafetería"/>
        </Head>

        <div className="md:flex">
            <aside className="md:w-4/12">
                <Sidebar/>
            </aside>
            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
              <div className="p-10">
                <Pasos/>
                 {children}
              </div>
              
            </main>
        </div>
        {modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
          >
            <ModalProducto/>
          </Modal>
        )}

        <ToastContainer/>

      </>
    );
  }