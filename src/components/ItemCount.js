import { useState } from "react";
import { Button, ToggleButton } from "react-bootstrap";

const ItemCount = ({ stock, confirmarCantidad }) => {
    const [checked, setChecked] = useState(false);
    const [contador, setContador] = useState(1);

    const handleSumar = () => {
        if (contador < stock) {
        setContador(contador + 1);
        }
    };

    const handleRestar = () => {
        setContador(contador - 1);
    };

    const handleConfirmar = () => {
        confirmarCantidad(contador);
    };

    return (
        <>
        <div className="btnCount">
            <Button hidden={contador === stock} onClick={handleSumar}>
            +
            </Button>{" "}
            <p>Cantidad: {contador}</p>
            <Button
            variant="outline-dark"
            hidden={contador <= 1}
            onClick={handleRestar}
            >
            -
            </Button>
        </div>
        <div className="confirmarCantidad">
            <ToggleButton
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            value="1"
            onChange={(e) => setChecked(e.currentTarget.checked)}
            onClick={handleConfirmar}
            >
            Confirmar cantidad
            </ToggleButton>
        </div>
        </>
    );
};

export default ItemCount;
