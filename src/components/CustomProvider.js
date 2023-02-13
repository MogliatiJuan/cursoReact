import { createContext, useContext, useState } from "react";

const contexto = createContext()
const Provider = contexto.Provider

export const useCarrito = () => {
    const valorDelContexto = useContext(contexto)
    return valorDelContexto
}

const CustomProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [totalProductos, setTotalProductos] = useState(0)

    const agregarProducto = (producto, cantidad) => {
        if(estaEnCarrito(producto.id)){
            setCarrito(carrito.map(item => {
                return item.id === producto.id ? {...item, cantidad: item.cantidad + cantidad} : item
            }))
        }else {
            setCarrito([...carrito, {...producto, cantidad: cantidad}])
        }
    }

    // const eliminarProducto = (id) => {} buscar id dentro del {} y que se elimine

    const vaciarCarrito = () => {
        setCarrito([])
        setTotalProductos(0)
    }

    const estaEnCarrito = (id) => {
        return carrito.find((producto) => producto.id === id)
    }

    const cantidadProducto = (producto) => {
        let cantidad = 0;
        carrito.forEach(producto => {
            cantidad = cantidad + producto.cantidad
        })
        return cantidad
    }

    const valorDelContexto = {
        carrito: carrito,
        totalProductos: totalProductos,
        setCarrito: setCarrito,
        setTotalProductos: setTotalProductos,
        agregarProducto: agregarProducto,
        cantidadProducto: cantidadProducto,
        // eliminarProducto: eliminarProducto,
        vaciarCarrito: vaciarCarrito,
        estaEnCarrito: estaEnCarrito
    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}


export default CustomProvider