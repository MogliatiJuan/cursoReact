// import { useState } from "react"
import { Card } from "react-bootstrap"
import { useCarrito } from "./CustomProvider"

const Carrito = () => {

    // const [nombre, setNombre] = useState("")
    // const [email, setEmail] = useState("")
    // const [usuarios, setUsuarios] = useState([])
    const { carrito, vaciarCarrito } = useCarrito()



    const precioTotal = (producto) => {
        let total = 0;
        total += producto.price * producto.cantidad
        return total
    }

    const totalAPagar = () => {
        let total = 0;
        carrito.forEach(producto => {
            total += precioTotal(producto)
        });
        return total
    }

    return (
        <div>
            <h1>Estas por finalizar tu pedido en nuestra pagina.</h1>

            {carrito.length === 0 && "Aun no agregaste productos al carrito" }

            {carrito.map((producto) => {
                return (<Card key={producto.title}>
                    <Card.Img variant="top" src={producto.image} alt={producto.title}/>
                    <Card.Body>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>Precio: {producto.price}</Card.Text>
                    <Card.Text>Descripcion: {producto.description}</Card.Text>
                    <Card.Text>Categoria: {producto.category}</Card.Text>
                    <Card.Text>Cantidad: {producto.cantidad}</Card.Text>
                    <Card.Text>Subtotal: {precioTotal(producto)}</Card.Text>
                    </Card.Body>
                </Card>)
            })}
            {carrito.length != 0 && <p>Total: $ {totalAPagar()} </p>}
        </div>
    )
}

export default Carrito