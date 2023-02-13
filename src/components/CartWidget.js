import { NavLink } from "react-router-dom";
import { useCarrito } from "./CustomProvider";

const CartWidget = () => {
  const { cantidadProducto } = useCarrito();

  return (
    <NavLink to="/cart">
      <span className="material-icons">shopping_cart</span>
      <span id="numerito">{cantidadProducto()}</span>
    </NavLink>
  );
};

export default CartWidget;
