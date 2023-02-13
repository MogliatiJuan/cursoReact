import { useState } from "react";
import { useCarrito } from "./CustomProvider";

const ItemCount = ({ detalleProductos }) => {
    const { setTotalProductos, agregarProducto } = useCarrito();

    const [contador, setContador] = useState(1);

    const handleSumar = () => {
        if (contador < detalleProductos.stock) {
        setContador(contador + 1);
        }
    };

    const handleRestar = () => {
        setContador(contador - 1);
    };

    const handleConfirmar = () => {
        agregarProducto(detalleProductos, contador);
        setTotalProductos(contador);
    };

    return (
        <div>
        <button onClick={handleSumar}>+</button>
        <p>Cantidad: {contador}</p>
        <button onClick={handleRestar}>-</button>
        <button onClick={handleConfirmar}>Agregar al carrito</button>
        </div>
    );
};

export default ItemCount;
