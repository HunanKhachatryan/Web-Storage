import React from 'react'
import {Col, Row } from 'reactstrap'
import style from './Product.module.css'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img:'sss',
            price:'',
            date:''
        };
        // let img 
    }
    onMouseEnterHandler (event){
        // console.log(event.type  )
        event.target.style.borderColor = 'aqua'
          
    }
    onMouseLeaveHandler (event){
        // console.log(event.type)
        event.target.style.borderColor = '#f3eee7'
          
    }
    onSubmit (){
        
    }
    componentDidMount = async ()=>{
        try {
            const result = await fetch('http://localhost:8080/image?img='+ this.props.productName +'.png', {
                method: 'GET'
            })                
            let blob = await result.blob()
            if(200 === result.status){
             this.setState({img:URL.createObjectURL(blob)})
            }                
        }catch (error) {
            alert(`${error}`);
        }
    }
    onClick = async (e) =>{
        try {
            const result = await fetch('http://localhost:8080/products?productId=' + e.target.value, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': 'Accesss'
                }
            })                
    
            if(200 === result.status){
                this.props.removeHanler()
            }else{
                console.log(result)
                alert(result);
            }
                
        }catch (error) {
            alert(`${error}`);
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
                                       <p> Price:{this.props.price}</p>
                                       <button className ={style.button} value ={this.props.productId} onClick ={this.onClick}></button>
                                    </div>
                                </div>
                            </Col>
                       </Row>
                    </React.Fragment>
        );
    }
}
export default Product;