import { Card } from "react-bootstrap";
import { useCarrito } from "./CustomProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const Carrito = () => {
    const { carrito } = useCarrito();
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

    const precioTotal = (producto) => {
        let total = 0;
        total += producto.price * producto.cantidad;
        return total;
    };

    const totalAPagar = () => {
        let total = 0;
        carrito.forEach((producto) => {
        total += precioTotal(producto);
        });
        return total;
    };

    useEffect(() => {
        if (usuario) {
        const orden = {
            usuario: usuario,
            carrito: carrito,
            totalAPagar: totalAPagar(),
            fecha: serverTimestamp(),
        };

        const ventasCollection = collection(db, "ventas");
        const pedidoFirebase = addDoc(ventasCollection, orden);

        pedidoFirebase
            .then((res) => {
            toast.success("pedido enviado");
            setIdPedido(res.id);
            })
            .catch(() => {
            toast.error("pedido no enviado");
            });
        }
    }, [usuario]);

    const onSubmit = (formData) => {
        if (formData.email !== formData.emailVerification) {
        toast.info("Los email no son iguales");
        } else {
        toast.success("Informacion enviada");
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
        <div>
        <div>
            <h1 hidden={idPedido !== ""}>
            Estas por finalizar tu pedido en nuestra pagina.
            </h1>
            {carrito.length === 0 && "Aun no agregaste productos al carrito"}

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
                    <Card.Text>Subtotal: {precioTotal(producto)}</Card.Text>
                </Card.Body>
                </Card>
            );
            })}
            {carrito.length !== 0 && <p>Total: $ {totalAPagar()} </p>}
        </div>
        {showForm ? (
            <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("firstName", { required: true, maxLength: 20 })}
                aria-invalid={errors.firstName ? "true" : "false"}
                placeholder="First Name"
            />
            {errors.firstName?.type === "required" && (
                <p role="alert">First name is required</p>
            )}
            <input
                {...register("lastName", { required: true, maxLength: 20 })}
                placeholder="Last Name"
            />
            <input
                type="tel"
                {...register("phoneNumber", { required: true, minLength: 6 })}
                placeholder="Phone Number"
            />
            <input
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
                disabled={carrito.length === 0}
            />
            </form>
        ) : (
            <div>
            <p>ID de la compra: {idPedido} </p>
            <p>Nombre: {usuario.firstName}</p>
            <p>Apellido: {usuario.lastName}</p>
            <p>Telefono: {usuario.phoneNumber}</p>
            <p>Email: {usuario.email}</p>
            <p>Codigo seguimiento: {generateTrackID()} </p>
            </div>
        )}
        </div>
    );
};

export default Carrito;
