import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = () => {

const params = useParams()

const [detalleProductos, setDetalleProductos] = useState({})

useEffect(() => {

  const pedido = fetch("https://fakestoreapi.com/products/" + params.id)

  pedido
  .then((respuesta)=>{ 
    const detalleProductos = respuesta.json()
    return detalleProductos
  })
  .then((detalleProductos)=>{
    setDetalleProductos(detalleProductos)
  })

  .catch((err) =>{
    console.log(err)
  })
},[])

  return (
    <ItemDetail detalleProductos={detalleProductos}/>
  )
}

export default ItemDetailContainer