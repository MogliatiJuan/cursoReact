import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "./firebase";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [load, setLoad] = useState(false);
  const [productos, setProductos] = useState([]);

  const props = useParams();

  console.log(props.category)

  useEffect(() => {
    toast.info("Cargando productos")
    const productosCollection = collection(db,"productos")
    let pedidoFirestore

    if (props.category){
      const filtro = query(productosCollection,where("category","==",`${props.category}`))
      pedidoFirestore = getDocs(filtro)
    } else {
      pedidoFirestore = getDocs(productosCollection)
    }
    

    pedidoFirestore
    .then((respuesta) => {
      const productosFirestore = respuesta.docs.map(doc => ({
        ...doc.data(), id: doc.id
      }))
      setProductos(productosFirestore)
      setLoad(true)
      toast.dismiss()
      toast.success("Productos cargados")
    })
      .catch((err) => {
        toast.error("Hubo un error con la base de datos, intente mas tarde.")
      });

    // let pedido = fetch("https://fakestoreapi.com/products");

    // if (props.category) {
    //   pedido = fetch(
    //     "https://fakestoreapi.com/products/category/" + props.category
    //   );
    // } else {
    //   pedido = fetch("https://fakestoreapi.com/products");
    // }

    // pedido
    //   .then((respuesta) => {
    //     const productos = respuesta.json();
    //     return productos;
    //   })
    //   .then((productos) => {
    //     setProductos(productos);
    //     setLoad(true);
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [props.category]);

  return (
    <div className="greeting">
      {load ? null : "Cargando..."}
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
