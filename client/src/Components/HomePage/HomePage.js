import React from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from '../NavBar/Navbar';
import Products from '../Products/Products'

class HomePage extends React.Component{
  constructor(props){
      super(props)
      this.state = {
            products:[],
            showModal: false
        }
      this.handleChange = this.handleChange.bind(this);
      this.onClick = this.onClick.bind(this)
  }
  handleChange(e) {
    if (e.target.id === 'Search Input') {
        this.setState({ text: e.target.value });
    }
    
}
  onClick(e){
    if (e.target.id === "add"){
        this.setState({count:this.state.count + 1})
    }
        this.setState({showModal:!this.state.showModal})
  }
  
  
render(){ 
    if (getCookie("isAuthed") !== "true" ){
        return <React.Fragment>
            "message" : "Forbiden"
        </React.Fragment>
    }
  return (
        <React.Fragment>
            <Row>
                <Col>
                    <NavBar></NavBar>
                </Col>
            </Row>
            <Row>
                <Col> Most sold products
                </Col>
            </Row>
            <Row>
                <Col > Best providers

                </Col>
            </Row>
            <Row>
              <Products>
                
              </Products>
            </Row>
            <Row>
                <Col> Best shops
                </Col>
            </Row>  
        </React.Fragment>
      
    
  );}
}
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
export default HomePage;