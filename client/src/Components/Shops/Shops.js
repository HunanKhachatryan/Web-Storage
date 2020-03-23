import React from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import Shop from './Shop'
import NavBar from '../NavBar/Navbar'
import CreateShop from './AddShop/AddShop'
import { getCookie} from '../HomePage/HomePage'
import style from './Shop.module.css'

export default class Shops extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            showModal: false
        };
        this.getShops = this.getShops.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)

    }
    handleCloseModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleChange = async (event) => {
        const newProducts = this.products.filter(product => product.name === event.target.value)
        this.setState({
            value: event.target.value,
            products: newProducts
        })

    }
    getShops = async () => {
        try {
            let accessToken = getCookie("accessToken")
            const result = await fetch('http://localhost:8080/shops', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'AccessTocken': accessToken
                }
            })
            const myJson = await result.json();
            if (200 === result.status) {
                this.setState({
                    shops: myJson
                })
            } else {
                alert(result);
            }

        } catch (error) {
            alert(error);
        }
    }
    componentDidMount() {
        this.getShops()
    }
    render(){ 
        if (getCookie("isAuthed") !== "true" ){
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
                            <h3> Shops </h3>
                        </Col>
                        <Col lg = "2" md = "2" sm = "2">
                            <Button color="success" onClick={this.handleCloseModal}>Add Shop</Button>
                            <Modal className = "custom-modal" size="sm" isOpen={this.state.showModal} toggle={this.onClick} >
                                    <ModalHeader className = "custom-modal" toggle={this.onClick} close ={close}>Add Shop 
                                    </ModalHeader>
                                    
                                <ModalBody >
                                    <CreateShop className ={style.Container} toggle={this.handleCloseModal} getProducts = {this.getProducts}  ></CreateShop>
                                </ModalBody>
                            </Modal>
                        </Col> 
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                            {this.state.shops.map((shop,index) => (
                                <Col xs = '6' md= '3' sm ="4" lg ='2'>
                                    <Shop removeHandler = {this.getShops} name = {shop.name} id ={shop.shopId} phone = {shop.phone} address = {shop.address} email ={shop.email} img = {shop.image}></Shop>
                                </Col>))}

                            </Row>
                        </Col>                        
                    </Row>
                    </React.Fragment>
        );
    }

}