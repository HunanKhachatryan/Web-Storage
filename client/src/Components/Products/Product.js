import React from 'react'
import {Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import style from './Product.module.css'
import SaleProduct from './SaleProduct/SaleProduct';
class Product extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            showModal : false
        }
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }
    onMouseEnterHandler (event){
        event.target.style.borderColor = 'aqua'
          
    }
    onMouseLeaveHandler (event){
        event.target.style.borderColor = '#f3eee7'
          
    }
    handleCloseModal(){
          this.setState({showModal:!this.state.showModal})
    }

    imageHandler(){
        var arrayBufferView = new Uint8Array( this.props.img.data );
        let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );              
        return URL.createObjectURL(blob)
    }
    removeProduct = async (e) =>{
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
                alert(result);
            }
                
        }catch (error) {
            alert(`${error}`
            );
        }
    }
    render(){
        if (this.props.count !== undefined){
            var totalCount = <p>Total count : {this.props.count}</p>
            var saleBtn = <button className = {style.saleBtn} value ={this.props.productId} onClick ={this.handleCloseModal}>Sale</button>
        }
        return(
            <div className = {style.productdiv} onMouseEnter = {this.onMouseEnterHandler}  onMouseLeave = {this.onMouseLeaveHandler} >
                <img className = {style.img} src = {this.imageHandler()} alt = {"img"}  ></img>
                <div className = {style.div}>
                    #{this.props.productNumber} {this.props.productName}
                    <p> Price: {this.props.price}</p>
                    {totalCount}
                    {saleBtn}
                </div>
                <Modal className = "custom-modal" size="sm" isOpen={this.state.showModal} toggle={this.onClick} >
                    <ModalHeader className = "custom-modal" toggle={this.onClick} close ={<Button className="closeButton" color="danger" onClick={this.handleCloseModal}>X</Button>}>
                        Sale Product
                    </ModalHeader>
                    <ModalBody >
                        <SaleProduct removeHandler = {this.props.removeHandler} handleCloseModal={this.handleCloseModal} productId ={this.props.productId}></SaleProduct>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default Product;