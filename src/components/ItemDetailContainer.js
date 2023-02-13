import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "./firebase";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const params = useParams();
  const [detalleProductos, setDetalleProductos] = useState({});

  useEffect(() => {
    toast.info("Cargando producto...");

    const productosCollection = collection(db, "productos");
    const referencia = doc(productosCollection, params.id);
    const pedidoFirebase = getDoc(referencia);

    pedidoFirebase
      .then((respuesta) => {
        toast.dismiss();
        toast.success("Producto cargado");
        const productoFirebase = respuesta.data();
        productoFirebase.id = respuesta.id;
        setDetalleProductos(productoFirebase);
      })
      .catch(() => {
        toast.error("Producto no cargado");
      });
  }, [params.id]);

  return <ItemDetail detalleProductos={detalleProductos} />;
};

export default ItemDetailContainer;
