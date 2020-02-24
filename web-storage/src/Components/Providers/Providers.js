import React from 'react'
import {Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Product from './Provider'
import NavBar from '../NavBar/Navbar'
import CreateProvider from './Create Provider/CreateProvider'
import {getCookie} from '../HomePage/HomePage'
import  style from  './Provider.module.css'

export default class Providers extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            providers: [],
            isOpen:true,
            showModal: false
        };
        this.getProviders = this.getProviders.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)

    }
    handleCloseModal(){
        console.log("handle")
          this.setState({showModal:!this.state.showModal})
    }
    handleChange = async (event) => {    
        const newProducts = this.products.filter(product => product.name === event.target.value)
        this.setState({value: event.target.value, products:newProducts})
    
    }
    getProviders = async () => {
        try {
            let accessToken = getCookie("accessToken")
            const result = await fetch('http://localhost:8080/providers', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': accessToken
                }
            })                
            const myJson = await result.json();
            if(200 === result.status){
                this.setState({providers:myJson})
            }else{
                console.log(result)
                alert(result);
            }
                
        }catch (error) {
            alert(error);
        }
    }
    componentDidMount(){
        this.getProviders()
    }

    render(){ 
        if (getCookie("isAuthed") !== "true" ){
            console.log(getCookie("isAuthed"))
            return <React.Fragment>
                "message" : "Forbiden"
            </React.Fragment>
        }
        const close = <Button className={style.closeButton} color="danger" onClick={this.handleCloseModal}>X</Button>
        return( <React.Fragment >
                    <Row>
                        <Col>
                            <NavBar></NavBar>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3> Providers </h3>
                        </Col>
                        <Col lg = "2" md = "2" sm = "2">
                            <Button color="success" onClick={this.handleCloseModal}>Add Provider</Button>
                            <Modal className = "custom-modal" size="sm" isOpen={this.state.showModal} toggle={this.onClick} >
                                    <ModalHeader className = "custom-modal" toggle={this.onClick} close ={close}>Add Provider 
                                    </ModalHeader>
                                    
                                <ModalBody >
                                    <CreateProvider className ={style.Container} toggle={this.handleCloseModal} getProducts = {this.getProducts}  ></CreateProvider>
                                </ModalBody>
                            </Modal>
                        </Col> 
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                            {this.state.providers.map((provider,index) => (
                                <Col xs = '6' md= '3' sm ="4" lg ='2'>
                                    <Product removeHandler = {this.getProviders} name = {provider.name} id ={provider.providerId} phone = {provider.phone} surname = {provider.surname} email ={provider.email} img = {provider.image}></Product>
                                </Col>))}

                            </Row>
                        </Col>                        
                    </Row>
                    </React.Fragment>
        );
    }
}