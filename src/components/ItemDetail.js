import Card from "react-bootstrap/Card";
import ItemCount from "./ItemCount";

const ItemDetail = ({ detalleProductos }) => {

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
      <ItemCount detalleProductos={detalleProductos} />
    </div>
  );
};

export default ItemDetail;
