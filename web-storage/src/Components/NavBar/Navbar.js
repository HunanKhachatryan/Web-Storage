import React from 'react'
import { Navbar, NavLink,NavItem, Nav } from 'reactstrap';
class NavBar extends React.Component {
    render(){
        return( <Navbar color = 'dark' >
                        <Nav>
                            <NavItem>
                                <NavLink href = '/home'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href = '/shops'>Shops</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href = '/providers'>Providers</NavLink>
                            </NavItem>
                            <NavItem>                                                                                                                                                                                                                                                                                 
                                <NavLink href = '/products'>Products</NavLink>
                            </NavItem>
                        </Nav> 
                </Navbar>
        );
    }
}
export default NavBar;