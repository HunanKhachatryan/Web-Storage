import React from 'react'
import { Navbar, NavLink,NavItem, Nav,Collapse } from 'reactstrap';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:true
        };
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    handleOpen = () => {
        this.setState({ isOpen: true })
      }

    handleClose = () => {
        this.setState({ isOpen: false })
    }
    render(){
        return( <Navbar color = 'dark' onMouseOver ={this.handleOpen} onMouseLeave={this.handleClose} >
                    <Collapse isOpen = {this.state.isOpen}  >
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
                    </Collapse>
                </Navbar>
        );
    }
}
export default NavBar;