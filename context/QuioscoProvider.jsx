import { useState,useEffect, createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext =createContext()

const QuioscoProvider = ({children}) =>{

    const [categorias,setCategorias] = useState([])
    const [categoriaActual,setCategoriaActual] = useState({})
    const [producto,setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido,setPedido] =useState([])
    const [nombre,setNombre] = useState('')
    const [total,setTotal] = useState(0)


    const router = useRouter()

    const obtenerCategorias = async ()=>{
        try {
            const { data } = await axios ('/api/categorias')
            setCategorias(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        obtenerCategorias()
    },[])
    useEffect(()=>{
     setCategoriaActual(categorias[0])   
    },[categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto})=> {
        if(pedido.some(productoState => productoState.id === producto.id)){
            //ACTUALIZAR SOLO CANTIDAD SI EL PRODUCTO YA ESTA EN EL PEDIDO
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Cambio Guardado Correctamente')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        setModal(false)
    }

    const HandleEditarCantidades = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }
    const HandleEliminarProducto = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) =>{
        e.preventDefault();

        try {
            //data es para acceder a la respuesta
            //Por defecto Axios tiene metodo de tipo GET, pero con axios.post cambia a metodo POST
            await axios.post('/api/ordenes',{pedido, nombre, total, fecha: Date.now().toString()})
            //RESETEAR LA APP
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(()=>{
                router.push('/')
            },2000)

        } catch (error) {
           console.log(error) 
        }

    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                HandleEditarCantidades,
                HandleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext