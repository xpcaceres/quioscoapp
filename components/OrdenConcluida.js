import Image from "next/image"
import axios from 'axios'
import { toast } from "react-toastify"
import {formatearDinero, formatearFecha, formatearSoloFecha} from '../helpers'


/*
<div className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Orden: {id}</h3>
        <p className="text-lg font-bold">Cliente: {nombre}</p>

        <div>
           {pedido.map(platilloC =>(
            <div
                key={platilloC.id}
                className="py-3 flex border-b last-of-type:border-0 items-center"

            >
                
                <div className="p-5 space-y-2">
                    <h4 className="text-xl font-bold text-amber-500">{platilloC.nombre}</h4>
                    <p className="text-lg font-bold">Cantidad: {platilloC.cantidad}</p>
                </div>
            </div>
           ))} 
        </div>
        <div className="md:flex md:items-center md: justify-between my-10">
            <p className="mt-5 font-black text-4xl text-amber-500">
                Total a Pagar: {formatearDinero(total)}
            </p>
            

        </div>
    </div>
*/



export default function OrdenConcluida({orden}) {
    const {id, nombre, total, pedido, fecha} = orden


    const completarOrden = async ()=>{
        try {
           await axios.post(`/api/ordenesconcluidas/${id}`) 
           toast.success('Orden Lista');
        } catch (error) {
            toast.error('Hubo un Error')
        }
    }

  return (
        <div>
            <table className="border">
                <tr>
                <th className="border">Fecha</th>
                    <th className="border">Cliente</th>
                    <th className="border">Platillo</th>
                    <th className="border">Precio unitario</th>
                    <th className="border">Cantidad</th>
                    <th className="border">Sub-Total</th>
                    <th className="border">Total</th>
                </tr>
                <tr>
                    
                    <td>
                        {formatearFecha(fecha)}
                    </td>

                    <td>
                      {nombre}  
                    </td>
                    {pedido.map(platilloC =>(
                    <tr>
                         <td>{platilloC.nombre}</td>
                    </tr>
                    ))}

                    <td>
                    {pedido.map(platilloC =>(
                        <tr>                           
                            <td>{formatearDinero(platilloC.precio)}</td>
                        </tr>
                        ))}
                    </td>
                    
                    <td>
                    {pedido.map(platilloC =>(
                        <tr>                           
                            <td>{platilloC.cantidad}</td>
                        </tr>
                        ))}
                    </td>
                    
                    <td>
                    {pedido.map(platilloC =>(
                        <tr>                           
                            <td>{formatearDinero(platilloC.cantidad * platilloC.precio)}</td>
                        </tr>
                        ))}
                    </td>
                    <td>
                        {formatearDinero(total)}
                    </td>

                </tr>
                
            </table>

            
        </div>
    
    
  )
}
