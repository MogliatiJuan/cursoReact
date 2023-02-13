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
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand>Crypto Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="navFooter">
                <Nav className="me-auto">
                <Nav.Link href="https://twitter.com/Papu_Crypto" target="_blank">
                    Twitter
                </Nav.Link>
                <p>Copyright &copy; 2022</p>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
};

export default NavBar;
