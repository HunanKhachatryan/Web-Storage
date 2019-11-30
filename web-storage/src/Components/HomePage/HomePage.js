import React from 'react';
import {Row, Col,Input, Button } from 'reactstrap';
import Product from '../Products/Product'
import NavBar from '../NavBar/Navbar';
import style from './HomePage.module.css'

class Example extends React.Component{
  constructor(props){
      super(props)
      this.state = {
            products:[],
          isOpen:true
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
    if (e.target.id === "Search"){
        this.setState({count:this.state.count + 1})
    }
  }
  
  componentDidMount = async () => {
    try {
        const result = await fetch('http://localhost:8080/products?name=Cola 500ml', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AccessTocken': 'Accesss'
            }
        })                

        const myJson = await result.json();
        if(200 === result.status){
            this.setState({products:myJson})
        }else{
            console.log(result)
            alert(result);
        }
            
    }catch (error) {
        alert(`Password or Username is false ${error}`);
    }

  }
render(){ 
    console.log(this.state)
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
                {this.state.products.map((product,index) => (<Col xs = '6'md= '3' sm ="4" lg ='2'><Product productName = {product.name}productNumber = {index + 1} price = {product.price}></Product></Col>))}
            </Row>
        </React.Fragment>
      
    
  );}
}
export default Example;