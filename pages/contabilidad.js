import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "../layout/AdminLayout"
import OrdenConcluida from '../components/OrdenConcluida'
import {formatearDinero, formatearSoloFecha} from '../helpers'

export default function Contabilidad(){

    const fetcher = () => axios('/api/ordenesconcluidas').then(datos => datos.data)
    
    const { data, error, isLoading } = useSWR('/api/ordenesconcluidas', fetcher,{refreshInterval:2000})

    console.log(data)

    return(
        <AdminLayout pagina={'Contabilidad'}>
            <h1 className="text-4xl font-black">Panel de Contabilidad</h1>
            <p className="text-2xl my-10">Administra las Ordenes Concluidas</p>
            {data && data.length ? data.map(orden =>
            <OrdenConcluida
                key={orden.id}
                orden ={orden}
            />
            ) : <p>Aun No hay Ordenes Concluidas</p>}
            
        </AdminLayout>
    )
}