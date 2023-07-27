import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export default function TopNavBar(){
    const navListStyle = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem"
    }
    return (
        <Navbar variant="dark" expand="lg" style={{backgroundColor: "#ff1801"}}>
            <Container>
                <Navbar.Brand href="/" className="text-white" style={{fontFamily: 'Formula1-Black'}}>F1 Webapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#" style={navListStyle}>Seasons</Nav.Link>
                        <Nav.Link href="/schedule" style={navListStyle}>Schedule</Nav.Link>
                        <NavDropdown title="Standings" id="basic-nav-dropdown" style={navListStyle}>
                            <NavDropdown.Item href="/driverStandings">Drivers</NavDropdown.Item>
                            <NavDropdown.Item href="/constructorStandings">Constructors</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Champions" id="basic-nav-dropdown" style={navListStyle}>
                            <NavDropdown.Item href="/driverChampions">Driver</NavDropdown.Item>
                            <NavDropdown.Item href="/constructorChampions">Constructor</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Tracks" id="basic-nav-dropdown" style={navListStyle}>
                            <NavDropdown.Item href="/currentTracks">Current</NavDropdown.Item>
                            <NavDropdown.Item href="/allTracks">All</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Drivers" id="basic-nav-dropdown" style={navListStyle}>
                            <NavDropdown.Item href="#">Current</NavDropdown.Item>
                            <NavDropdown.Item href="#">All</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Constructors" id="basic-nav-dropdown" style={navListStyle}>
                            <NavDropdown.Item href="#">Current</NavDropdown.Item>
                            <NavDropdown.Item href="#">All</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}