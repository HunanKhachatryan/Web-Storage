import React from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from '../NavBar/Navbar';
import Product from '../Products/Product'
import Shop from '../Shops/Shop'
import Provider from '../Providers/Provider'

class HomePage extends React.Component{
  constructor(props){
      super(props)
      this.state = {
            statistics:{
              products:[],
              shops:[],
              providers:[]
            },
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
  componentDidMount = async (e) =>{
    try {
      let accessToken = getCookie("accessToken")
      const result = await fetch('http://localhost:8080/statistics', {
          method: 'GET',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AccessTocken': accessToken
          }
      })                
      const myJson = await result.json();
      if(200 === result.status){
        console.log(myJson)
          this.setState({statistics:myJson})
      }else{
          alert(result);
      }
          
  }catch (error) {
      alert(error);
  }
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
              <Col> Most popular products </Col>
            </Row>
            <Row>
              {this.state.statistics["products"].map((product,index) => 
                <Col key = {index} xs = '6' md= '3' sm ="4" lg ='2'>
                    <Product  productName = {product.name} productId = {product.productId} productNumber = {index + 1} price = {product.price}  img = {product.image}></Product>
                </Col>
              )}
            </Row>
            <Row>
                <Col> Best providers </Col>
            </Row>
            <Row>
              {this.state.statistics["providers"].map((provider,index) => 
                <Col key = {index} xs = '6' md= '3' sm ="4" lg ='2'>
                    <Provider  name = {provider.name} id ={provider.providerId} phone = {provider.phone} surname = {provider.surname} email ={provider.email} img = {provider.image}></Provider>
                </Col>
              )}
            </Row>
            <Row>
                <Col> Best shops </Col>
            </Row>
            <Row>
              {this.state.statistics["shops"].map((shop,index) => 
                <Col key = {index} xs = '6' md= '3' sm ="4" lg ='2'>
                    <Shop  name = {shop.name} id ={shop.shopId} phone = {shop.phone} address = {shop.address} email ={shop.email} img = {shop.image}></Shop>
                </Col>
              )}
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