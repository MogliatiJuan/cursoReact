import { Route, Routes } from "react-router-dom";
import Carrito from "./Carrito";
import ItemDetailContainer from "./ItemDetailContainer";
import ItemListContainer from "./ItemListContainer";
import PageNotFound from "./PageNotFound";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Carrito />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
