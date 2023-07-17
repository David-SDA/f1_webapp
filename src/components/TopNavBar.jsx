import '../styles/topNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export default function TopNavBar(){
    return (
        <Navbar variant='dark' expand='lg' className='bgColorMyRed'>
            <Container>
                <Navbar.Brand href='/' className='title'>F1 Webapp</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link href='#' className='navList rounded-3'>Seasons</Nav.Link>
                        <Nav.Link href="/schedule" className='navList rounded-3'>Schedule</Nav.Link>
                        <NavDropdown title='Standings' id='basic-nav-dropdown' className='navList'>
                            <NavDropdown.Item href="/driversStandings" className='navList navDrop'>Drivers</NavDropdown.Item>
                            <NavDropdown.Item href="/constructorsStandings" className='navList'>Constructors</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Champions' id='basic-nav-dropdown' className='navList'>
                            <NavDropdown.Item href='/driverChampions' className='navList'>Driver</NavDropdown.Item>
                            <NavDropdown.Item href='/constructorChampions' className='navList'>Constructor</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Tracks' id='basic-nav-dropdown' className='navList'>
                            <NavDropdown.Item href='#'>Current</NavDropdown.Item>
                            <NavDropdown.Item href='/tracks'>All</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Drivers' id='basic-nav-dropdown' className='navList'>
                            <NavDropdown.Item href='#'>Current</NavDropdown.Item>
                            <NavDropdown.Item href='#'>All</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title='Constructors' id='basic-nav-dropdown' className='navList'>
                            <NavDropdown.Item href='#'>Current</NavDropdown.Item>
                            <NavDropdown.Item href='#'>All</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}