import { Button, Card } from "react-bootstrap";
import { useCarrito } from "./CustomProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const Carrito = () => {
    const { carrito, vaciarCarrito } = useCarrito();
    const [showForm, setShowForm] = useState(true);
    const [usuario, setUsuario] = useState(null);
    const [idPedido, setIdPedido] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
        firstName: "",
        lastName: "",
        },
    });

    const subTotal = (producto) => {
        let total = 0;
        total += producto.price * producto.cantidad;
        return total;
    };

    const totalAPagar = () => {
        return carrito.reduce(
        (acumulador, producto) => acumulador + producto.price * producto.cantidad,
        0
        );
    };

    useEffect(() => {
        if (usuario) {
        const ordenDeCompra = {
            usuario: usuario,
            carrito: carrito,
            totalAPagar: totalAPagar(),
            fecha: serverTimestamp(),
        };

        const ventasCollection = collection(db, "ventas");
        const pedidoFirebase = addDoc(ventasCollection, ordenDeCompra);

        pedidoFirebase
            .then((res) => {
            toast.success("pedido enviado", {
                icon: () => <span className="material-icons">done_all</span>,
            });
            setIdPedido(res.id);
            vaciarCarrito();
            })
            .catch(() => {
            toast.error("Hubo un incoveniente con su pedido, intente de nuevo.", {
                icon: () => (
                <span className="material-icons">production_quantity_limits</span>
                ),
            });
            });
        }
    }, [usuario]);

    const onSubmit = (formData) => {
        if (formData.email !== formData.emailVerification) {
        toast.info("Los email no son iguales", {
            icon: () => (
            <span className="material-icons">notification_important</span>
            ),
        });
        } else {
        toast.success("Informacion enviada", {
            icon: () => <span className="material-icons">send</span>,
        });
        setUsuario(formData);
        setShowForm(false);
        }
    };

    const generateTrackID = () => {
        const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let trackID = "";
        for (let i = 0; i < 20; i++) {
        trackID += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
        }
        return trackID;
    };

    return (
        <>
        <div className="carritoCargado">
            <h1 hidden={carrito.length === 0 || idPedido !== ""}>
            Estas por finalizar tu pedido en nuestra pagina.
            </h1>
            <p
            className="advertenciaNoProductos"
            hidden={carrito.length !== 0 || idPedido !== ""}
            >
            Aun no agregaste productos al carrito!
            </p>
            <h3 hidden={idPedido === ""}>
            Gracias por comprar en nuestra tienda. Vuelva pronto!
            </h3>
            <div className="productosEnCarrito">
            {carrito.map((producto) => {
                return (
                <Card hidden={idPedido !== ""} key={producto.title}>
                    <Card.Img
                    variant="top"
                    src={producto.image}
                    alt={producto.title}
                    />
                    <Card.Body>
                    <Card.Title>{producto.title}</Card.Title>
                    <Card.Text>Precio: {producto.price}</Card.Text>
                    <Card.Text>Descripcion: {producto.description}</Card.Text>
                    <Card.Text>Categoria: {producto.category}</Card.Text>
                    <Card.Text>Cantidad: {producto.cantidad}</Card.Text>
                    <Card.Text>Subtotal: {subTotal(producto)}</Card.Text>
                    </Card.Body>
                </Card>
                );
            })}
            </div>
            <Button
            className="vaciarCarrito"
            variant="outline-danger"
            hidden={carrito.length === 0 || idPedido !== ""}
            onClick={vaciarCarrito}
            >
            <span class="material-icons">remove_shopping_cart</span>
            Vaciar Carrito
            </Button>{" "}
            {carrito.length !== 0 && (
            <p className="totalAPagar">
                <span class="material-icons">shopping_cart_checkout</span>
                Total: $ {totalAPagar()}{" "}
            </p>
            )}
        </div>
        {showForm ? (
            <form onSubmit={handleSubmit(onSubmit)} className="formulario">
            <input
                type="text"
                {...register("firstName", { required: true, maxLength: 20 })}
                aria-invalid={errors.firstName ? "true" : "false"}
                placeholder="First Name"
            />
            {errors.firstName?.type === "required" && (
                <p role="alert">First name is required</p>
            )}
            <input
                type="text"
                {...register("lastName", { required: true, maxLength: 20 })}
                aria-invalid={errors.lastName ? "true" : "false"}
                placeholder="Last Name"
            />
            {errors.lastName?.type === "required" && (
                <p role="alert">Last name is required</p>
            )}
            <input
                type="number"
                {...register("phoneNumber", { required: true, minLength: 6 })}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                placeholder="Phone Number"
            />
            {errors.phoneNumber?.type === "required" && (
                <p role="alert">Phone number is required</p>
            )}
            <input
                type="email"
                {...register("email", {
                required: "Email Address is required",
                pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="Email"
            />
            {errors.email && <p role="alert">{errors.email?.message}</p>}
            <input
                type="email"
                {...register("emailVerification", {
                required: "Must to rewrite the email",
                })}
                aria-invalid={errors.emailVerification ? "true" : "false"}
                placeholder="Email"
            />
            {errors.emailVerification && (
                <p role="alert">{errors.emailVerification?.message}</p>
            )}
            <input
                type="submit"
                value="Enviar pedido"
                hidden={carrito.length === 0}
            />
            <label hidden={carrito.length !== 0}>
                Agrega productos al carrito para poder completar tu orden
            </label>
            </form>
        ) : (
            <div className="compraFinalizada">
            <p className="idCompra">ID de la compra: {idPedido} </p>
            <p>Nombre: {usuario.firstName}</p>
            <p>Apellido: {usuario.lastName}</p>
            <p>Telefono: {usuario.phoneNumber}</p>
            <p>Email: {usuario.email}</p>
            <p className="codigoSeguimiento">
                Codigo seguimiento: {generateTrackID()}{" "}
            </p>
            </div>
        )}
        </>
    );
};

export default Carrito;
