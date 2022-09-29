import React from 'react';
    import { Container, Nav, Navbar } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">GENSPEAKS</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard" className="active">Dashboard</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            { children }
        </>
        )
}

export default Layout;