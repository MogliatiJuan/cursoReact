import React from 'react'
import Card from 'react-bootstrap/Card';


const ItemDetail = ({detalleProductos}) => {

  return (
    <div className='detalleProducto'>
        <Card>
          <Card.Img variant="top" src={detalleProductos.image} alt={detalleProductos.title}/>
          <Card.Body>
            <Card.Title>{detalleProductos.title}</Card.Title>
            <Card.Text>
              Precio: {detalleProductos.price}
            </Card.Text>
            <Card.Text>
              Descripcion: {detalleProductos.description}
            </Card.Text>
            <Card.Text>
              Codigo del articulo: {detalleProductos.id}
            </Card.Text>
            <Card.Text>
              Categoria: {detalleProductos.category}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}

export default ItemDetail