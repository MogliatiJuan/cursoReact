import Card from "react-bootstrap/Card";
import ItemCount from "./ItemCount";
import { useCarrito } from "./CustomProvider";
import { useState } from "react";

const ItemDetail = ({ detalleProductos }) => {

  const [cantidadProducto, setCantidadProducto] = useState(1)
  const { agregarProducto } = useCarrito()

  // const onAdd = (cantidad) => {
  //   setCantidadProducto(cantidadProducto)
  //   agregarProducto(detalleProductos, cantidadProducto)
  // }



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
      <ItemCount detalleProductos={detalleProductos}/> 
      {/* onAdd={onAdd} */}
    </div>
  );
};

export default ItemDetail;
