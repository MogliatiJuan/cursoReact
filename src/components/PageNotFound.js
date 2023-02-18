import { Container, Row, Col, Alert } from "react-bootstrap";

const PageNotFound = () => {
    return (
        <Container className="pageNotFound">
        <Row>
            <Col>
            <Alert variant="danger">
                <Alert.Heading>404 Error: Página no encontrada</Alert.Heading>
                <p>Lo sentimos, la página que estás buscando no existe.</p>
            </Alert>
            </Col>
        </Row>
        </Container>
    );
};

export default PageNotFound;
