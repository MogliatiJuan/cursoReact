import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = (props) => {
    if (props.isHeader) {
        return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Link to="/">Crypto Club</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Link to="/category/clothing">Ropa W&M</Link>
                <Link to="/category/jewelery">Joyeria</Link>
                <Link to="/category/electronics">Electronica</Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            <CartWidget />
        </Navbar>
        );
    } else {
        return (
        <footer className="bg-light py-3">
            <Container>
            <Row>
                <Col md={4}>
                <h4>Información de contacto</h4>
                <p>Teléfono: +54 (336) 555-5555</p>
                <p>Correo electrónico: tienda@e-commerce.com</p>
                </Col>
                <Col md={4}>
                <h4>Horario de atención</h4>
                <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
                <p>Sábados: 9:00 am - 1:00 pm</p>
                </Col>
                <Col md={4}>
                <h4>Síguenos en las redes sociales</h4>
                <p>
                    <a href="https://www.linkedin.com/in/juan-manuel-mogliati-6451301b9/">
                    LinkedIn
                    </a>
                </p>
                <p>
                    <a href="https://twitter.com/Papu_Crypto">Twitter</a>
                </p>
                <p>
                    <a href="https://www.instagram.com/mogliatij/">Instagram</a>
                </p>
                </Col>
            </Row>
            </Container>
            <div className="text-center mt-3">
            <p>
                &copy; {new Date().getFullYear()} Tu Sitio. Todos los derechos
                reservados.
            </p>
            </div>
        </footer>
        );
    }
};

export default NavBar;
