import React from 'react'
import {Col, Row, Button } from 'reactstrap'
import style from './Product.module.css'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            img:null,
            price:'',
            date:''
        };
    }
    onMouseEnterHandler (event){
        event.target.style.borderColor = 'aqua'
          
    }
    onMouseLeaveHandler (event){
        event.target.style.borderColor = '#f3eee7'
          
    }
    componentDidMount (){
        try { 
            var arrayBufferView = new Uint8Array( this.props.img.data );
            let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );              
             this.setState({img:URL.createObjectURL(blob),id:this.props.id})
        }catch (error) {
            alert(`${error}`);
        }
    }
    onClick = async (e) =>{
        let productId =  e.target.value
        try {
            const result = await fetch('http://localhost:8080/products?productId=' + productId, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': 'Accesss'
                }
            })                
    
            if(200 === result.status){
                this.props.removeHandler()
            }else{
                // console.log(result)
                alert(result);
            }
                
        }catch (error) {
            alert(`${error}`
            );
        }
    }
    render(){
        return( <React.Fragment>
                        <Row>
                            <Col>
                                <div className = {style.productdiv} onMouseEnter = {this.onMouseEnterHandler}  onMouseLeave = {this.onMouseLeaveHandler} >
                                    <img className = {style.img} src = {this.state.img} alt = {"img"}  ></img>
                                    <div className = {style.div}>
                                        #{this.props.productNumber} {this.props.productName}
                                       <p> Price: {this.props.price}</p>
                                       <p>Count: {this.props.count}</p>
                                       <Button color="danger" value ={this.props.productId} onClick ={this.onClick}>Remove</Button>
                                    </div>
                                </div>
                            </Col>
                       </Row>
                    </React.Fragment>
        );
    }
}
export default Product;