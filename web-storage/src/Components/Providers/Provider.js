import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import style from './Product.module.css'
class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            surname:'',
            phone:'',
            email:''
        };  
    }
    onMouseEnterHandler (event){
        console.log(event.type  )
        event.target.style.borderColor = 'aqua'
          
    }
    onMouseLeaveHandler (event){
        event.target.style.borderColor = '#f3eee7'
          
    }
    
    render(){
        const imageSrc = require('../../resources/pictures/' + this.props.productName + '.jpg')
        console.log(imageSrc)
        return( <div className = {style.Container}>
                        <Row>
                            <Col>
                                <div className = {style.productdiv} onMouseMove = {this.onMouseEnterHandler}  onMouseLeave = {this.onMouseLeaveHandler} >
                                    <img className = {style.img} src = {imageSrc} alt = {"img"}></img>
                                    <div className = {style.div}>
                                        #{this.props.productNumber} {this.props.productName}
                                       <p> Price:{this.props.price}</p>
                                    </div>
                                </div>
                            </Col>
                       </Row>
                    </div>
        );
    }
}
export default Provider;