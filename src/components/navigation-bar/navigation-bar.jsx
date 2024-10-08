import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: '2rem', fontWeight: 'bold' }}>myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>                                
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                
                            </>
                        )}
                    </Nav>
                    <Nav>
                    {user && (
                            <>
                                <Nav.Link onClick={onLoggedOut} style={{ color: 'blue' }}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};