import React from 'react';
import {Row, Col,Input, Button} from 'reactstrap';
import NavBar from '../NavBar/Navbar';

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
    console.log(this.state)
    if (e.target.id === "add"){
        this.setState({count:this.state.count + 1})
    }
    // if (e.target.id === "Search"){
        this.setState({showModal:!this.state.showModal})
    // }
  }
  
  
render(){ 
    if (getCookie("isAuthed") !== "true" ){
        console.log(getCookie("isAuthed"))
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
                <Col sm = '4' md = '6' lg = '8'>
                    <Input 
                    type = 'text'
                    id = 'Search Input' 
                    onChange = {this.handleChange}

                    />
                </Col>
                <Col sm = '2' md = '2' lg = '2'>
                    <Button id = 'Search' onClick = {this.onClick}>Search</Button>
                </Col>
            </Row>
            <Row>
            <button onClick={this.onClick}>
             Open the modal
            </button>
                <Col> sdsdsd
                
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
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
export default HomePage;