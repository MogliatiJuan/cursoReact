import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useCarrito } from "./CustomProvider";
import ItemCount from "./ItemCount";

const ItemDetail = ({ detalleProductos }) => {
  const { setTotalProductos, agregarProducto } = useCarrito();
  const [cantidad, setCantidad] = useState(0);

  const confirmarCantidad = (contador) => {
    setCantidad(contador);
  };

  const handleAddCart = () => {
    agregarProducto(detalleProductos, cantidad);
    setTotalProductos(cantidad);
  };

  return (
    <div className="detalleProducto">
      <Card>
        <Card.Img
          variant="top"
          src={detalleProductos.image}
          alt={detalleProductos.title}
        />
        <Card.Body>
          <Card.Title>{detalleProductos.title}</Card.Title>
          <Card.Text>Precio: {detalleProductos.price}</Card.Text>
          <Card.Text>Descripcion: {detalleProductos.description}</Card.Text>
          <Card.Text>Stock: {detalleProductos.stock}</Card.Text>
          <Card.Text>Categoria: {detalleProductos.category}</Card.Text>
        </Card.Body>
      </Card>
      <ItemCount
        stock={detalleProductos.stock}
        confirmarCantidad={confirmarCantidad}
      />
      <Button
        variant="outline-info"
        hidden={cantidad === 0}
        onClick={handleAddCart}
      >
        Añadir al carrito
      </Button>{" "}
    </div>
  );
};

export default ItemDetail;
