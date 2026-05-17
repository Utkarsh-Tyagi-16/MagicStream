import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import {useNavigate, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useSearch } from '../../context/SearchContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/MagicStreamLogo.png';
import './Header.css';

const Header = ({handleLogout}) => {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const { searchQuery, setSearchQuery } = useSearch();
    const { theme, toggleTheme } = useTheme();

    return (
        <Navbar variant={theme === 'dark' ? 'dark' : 'light'} expand="lg" sticky="top" className="magic-navbar shadow-sm py-3">
            <Container>
                <Navbar.Brand className="d-flex align-items-center fw-bold" style={{ cursor: 'pointer', fontSize: '1.4rem' }} onClick={() => navigate('/')}>
                     <img
                        alt="MagicStream Logo"
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block align-top me-2"
                    />
                    <span style={{background: '-webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>MagicStream</span>
                </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className ="me-auto">
                        <Nav.Link as = {NavLink} to="/" className="fw-semibold mx-2">
                            Home
                        </Nav.Link>
                        {auth && (
                             <Nav.Link as = {NavLink} to="/recommended" className="fw-semibold mx-2">
                                Recommended
                            </Nav.Link>
                        )}
                        <Nav.Link as = {NavLink} to="/watchlist" className="fw-semibold mx-2">
                            My List
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex me-3 my-2 my-lg-0">
                        <Form.Control
                            type="search"
                            placeholder="Search movies..."
                            className="magic-search rounded-pill px-4 py-2"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form>
    
                    <Nav className ="ms-auto align-items-center">
                        <Button 
                            variant="link" 
                            className="text-decoration-none me-3" 
                            onClick={toggleTheme}
                            style={{ color: 'var(--text-color)', fontSize: '1.2rem' }}
                            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                        </Button>

                        {auth ? (
                        <>
                            <span className="me-4 fw-medium" style={{color: 'var(--text-color)'}}>
                                Hello, <strong style={{color: 'var(--primary-color)'}}>{auth.first_name}</strong>
                            </span>
                            <Button variant={theme === 'dark' ? "outline-light" : "outline-dark"} className="rounded-pill px-4" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                        ):(
                            <>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    className="me-3 rounded-pill px-4 py-2 fw-semibold"
                                    onClick={() => navigate("/login")} 
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="rounded-pill px-4 py-2 fw-semibold"
                                    onClick={() => navigate("/register")}  
                                >
                                    Register
                                </Button>                        
                            </>
                        )}
                    </Nav>       
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;