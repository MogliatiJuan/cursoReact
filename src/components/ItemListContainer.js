import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
// import Button from 'react-bootstrap/Button';

const ItemListContainer = () => {

   const [load, setLoad] = useState(false)
   const [productos, setProductos] = useState([])

  const props = useParams()

  useEffect(() => {
    
    let pedido = fetch("https://fakestoreapi.com/products")

    if(props.category){
      pedido = fetch("https://fakestoreapi.com/products/category/" + props.category)
    } else {
      pedido = fetch("https://fakestoreapi.com/products")
    }
    
    pedido
    .then((respuesta)=>{ 
      const productos = respuesta.json()
      return productos
    })
    .then((productos)=>{
      setProductos(productos)
      setLoad(true)
    })

    .catch((err) =>{
      console.log(err)
    })

  }, [props.category])


  return (
    <div className="greeting">
      {load ? null : "Cargando productos"}
      <ItemList productos={productos}/>
    </div>
  )
}

export default ItemListContainer