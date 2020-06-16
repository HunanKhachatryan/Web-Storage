import React from 'react'
import {Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Product from './Product'
import NavBar from '../NavBar/Navbar'
import CreateProduct from './Create Product/CreateProduct'
import {getCookie} from '../HomePage/HomePage'

class Products extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showModal: false
        };
        this.getProducts = this.getProducts.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)

    }
    handleCloseModal(){
        this.setState({showModal:!this.state.showModal})
    }
    handleChange = async (event) => {    
        const newProducts = this.products.filter(product => product.name === event.target.value)
        this.setState({ products:newProducts})
    
    }
    getProducts = async (filter) => {
        try {
            if (filter === ""){
                
            }
            let accessToken = getCookie("accessToken")
            const result = await fetch('http://localhost:8080/products', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': accessToken
                }
            })                
            const myJson = await result.json();
            if(200 === result.status){
                this.setState({products:myJson})
            }else{
                alert(result);
            }
                
        }catch (error) {
            alert(error);
        }
    }
    componentDidMount = async (e) =>{
        await this.getProducts()
        this.state.products.map((product,index) => 
            console.log(product.productId)    
            )
    }
    render(){ 
        if (getCookie("isAuthed") !== "true" ){
            return <React.Fragment>
                "message" : "Forbiden"
            </React.Fragment>
        }
        const close = <Button className="closeButton" color="danger" onClick={this.handleCloseModal}>X</Button>
        return( <React.Fragment >
                    <Row>
                        <Col>
                            <NavBar></NavBar>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3> Products </h3>
                        </Col>
                        <Col lg = "2" md = "2" sm = "2">
                            <Button color="success" onClick={this.handleCloseModal}>Add Product</Button>
                            <Modal className = "custom-modal" size="sm" isOpen={this.state.showModal} toggle={this.onClick} >
                                    <ModalHeader className = "custom-modal" toggle={this.onClick} close ={close}>
                                            Add Product 
                                    </ModalHeader>
                                <ModalBody >
                                    <CreateProduct toggle={this.handleCloseModal} getProducts = {this.getProducts}  ></CreateProduct>
                                </ModalBody>
                            </Modal>
                        </Col> 
                    </Row>
                    <Row>
                        {this.state.products.map((product,index) => 
                            <Col key = {index} xs = '6' md= '3' sm ="4" lg ='2'>
                                <Product removeHandler = {this.getProducts} productName = {product.name} productId = {product.productId} productNumber = {index + 1} price = {product.price} count ={product.count} img = {product.image}></Product>
                            </Col>
                            )}                      
                    </Row>
                    </React.Fragment>
        );
    }
}
export default Products;