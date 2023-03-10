import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "./firebase";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const params = useParams();
  const [load, setLoad] = useState(false);
  const [detalleProductos, setDetalleProductos] = useState({});

  useEffect(() => {
    toast.info("Cargando producto...", {
      icon: () => <span className="material-icons">sync</span>,
    });

    const productosCollection = collection(db, "productos");
    const referencia = doc(productosCollection, params.id);
    const pedidoFirebase = getDoc(referencia);

    pedidoFirebase
      .then((respuesta) => {
        toast.dismiss();
        toast.success("Producto cargado", {
          icon: () => <span className="material-icons">backup</span>,
        });
        const productoFirebase = respuesta.data();
        productoFirebase.id = respuesta.id;
        setDetalleProductos(productoFirebase);
        setLoad(true);
      })
      .catch(() => {
        toast.error("El producto no ha podido cargarse", {
          icon: () => <span className="material-icons">sync_problem</span>,
        });
      });
  }, [params.id]);

  return (
    <>
      {load ? (
        <ItemDetail detalleProductos={detalleProductos} />
      ) : (
        <Rings
          height="150"
          width="150"
          color="#17E7B7"
          radius="50"
          wrapperStyle={{}}
          wrapperClass="loaderSpinner"
          visible={true}
          ariaLabel="rings-loading"
        />
      )}
    </>
  );
};

export default ItemDetailContainer;
