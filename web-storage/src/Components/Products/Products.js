import React from 'react'
import {Row, Col} from 'reactstrap';
import Product from './Product'
import NavBar from '../NavBar/Navbar'

class Products extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isOpen:true,
            value:'fanta'
        };
        let products = []
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    handleOpen = () => {
        this.setState({ isOpen: true })
      }

    handleClose = () => {
        this.setState({ isOpen: false })
    }
    handleChange = async (event) => {    
        const newProducts = this.products.filter(product => product.name === event.target.value)
        this.setState({value: event.target.value, products:newProducts})
    
    }
    handleRemove = async () => {
        try {
            const result = await fetch('http://localhost:8080/products', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': 'Accesss'
                }
            })                
    
            const myJson = await result.json();
            if(200 === result.status){
                this.products = myJson
                this.setState({products:myJson})
            }else{
                console.log(result)
                alert(result);
            }
                
        }catch (error) {
            alert(`Password or Username is false ${error}`);
        }
    }
    componentDidMount = async ()=>{
        try {
            const result = await fetch('http://localhost:8080/products', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': 'Accesss'
                }
            })                
    
            const myJson = await result.json();
            if(200 === result.status){
                this.products = myJson
                this.setState({products:myJson})
            }else{
                console.log(result)
                alert(result);
            }
                
        }catch (error) {
            alert(`Password or Username is false ${error}`);
        }
    }
    componentDidUpdate(){
        console.log("Update")
    }
    render(){
        return( <React.Fragment >
            <Row>
                <Col>
                    <NavBar></NavBar>
                </Col>
            </Row>
                    <Row>
                        <h3> Products </h3>
                    </Row>
                        <Row>
                        <Col md = "1">
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="Cola 500ml">Cola</option>
                                <option value="Fanta 500ml">Fanta</option>
                                <option value="Wine Armenia">Wine</option>
                                <option value="Beer 500ml">Beer</option>
                            </select>
                        </Col>
                            <Col>
                                <Row>
                                {this.state.products.map((product,index) => (
                                    <Col xs = '6'md= '3' sm ="4" lg ='2'>
                                        <Product removeHanler = {this.handleRemove} productName = {product.name} productId ={product.productId} productNumber = {index + 1} price = {product.price}></Product>
                                    </Col>))}

                                </Row>
                            </Col>
                       </Row>
                    </React.Fragment>
        );
    }
}
export default Products;