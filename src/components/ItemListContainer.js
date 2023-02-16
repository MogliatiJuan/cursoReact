import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "./firebase";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [load, setLoad] = useState(false);
  const [productos, setProductos] = useState([]);

  const props = useParams();

  useEffect(() => {
    toast.info("Cargando productos");
    const productosCollection = collection(db, "productos");
    let pedidoFirestore;

    if (props.category) {
      const filtro = query(
        productosCollection,
        where("category", "==", `${props.category}`)
      );
      pedidoFirestore = getDocs(filtro);
    } else {
      pedidoFirestore = getDocs(productosCollection);
    }

    pedidoFirestore
      .then((respuesta) => {
        const productosFirestore = respuesta.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos(productosFirestore);
        setLoad(true);
        toast.dismiss();
        toast.success("Productos cargados");
      })
      .catch(() => {
        toast.error("Hubo un error con la base de datos, intente mas tarde.");
      });
  }, [props.category]);

  return (
    <div className="greeting">
      {load ? (
        <ItemList productos={productos} />
      ) : (
        <Rings
          height="150"
          width="150"
          color="#17E7B7"
          radius="50"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      )}
    </div>
  );
};

export default ItemListContainer;
