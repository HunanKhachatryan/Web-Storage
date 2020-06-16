import React from 'react'
import { Button, Label } from 'reactstrap'
import {getCookie} from '../../HomePage/HomePage'
export default class SaleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            providers:[],
            shops:[],
            selectedShop:"",
            selectedProvider:""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addSaledProduct = this.addSaledProduct.bind(this)
       
    }
    onChange(e){
        
        if (e.target.id === "shops" ){ 
            this.setState({selectedShop:e.target.value})
        }else{
            this.setState({selectedProvider:e.target.value})
        }

    }

    onSubmit = async (e) =>{
        e.preventDefault()
        let productId = this.props.productId
        this.addSaledProduct()
        const result = await fetch('http://localhost:8080/products?productId=' + productId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        })                
        console.log(result)
        if(200 === result.status){
            this.props.handleCloseModal()   
            this.props.removeHandler()
        }else{
            alert(result);
        }
    }
    addSaledProduct = async () => {
            const formData = new FormData();
            formData.append('shopId', this.state.selectedShop);
            formData.append('productId', this.props.productId);
            formData.append('providerId', this.state.selectedProvider);
            formData.append('saledDate', new Date().toISOString().split("T")[0]);
            let accessToken = getCookie("accessToken")
            const result = await fetch('http://localhost:8080/statistics/products', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'AccessTocken': accessToken
                },
                body: formData
            })  
            console.log(result.status)
    }
    componentDidMount = async () => {
            let accessToken = getCookie("accessToken")
            let result = await fetch('http://localhost:8080/shops', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AccessTocken': accessToken
                }
            })                
            let myJson = await result.json();
            if(200 === result.status){
                this.setState({shops:myJson})
            }else{
                alert(result);
            }
            result = await fetch('http://localhost:8080/providers', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "referrerPolicy": "no-referrer",
                'AccessTocken': accessToken
                }
            })                
            myJson = await result.json();
            if(200 === result.status){
                const provider = myJson[[Math.floor(Math.random() * myJson.length)]]
                this.setState({
                    providers:myJson,
                    selectedProvider: provider.providerId
                })
            }else{
                alert(result);
            }
    }
    render() {
        
        return (
        <div >
            <div>
                <p>Are you want to sale product?</p>
            </div>  
            <form  onSubmit = {this.onSubmit}>
                <Button color ="primary" type ="submit" id ="Sale" onClick = {this.onSubmit}  >Sale</Button>
                <div>
                    <Label>Choose Shop</Label>
                    <select  id="shops" required onChange = {this.onChange}>
                        <option key = "" value = ""> select</option>
                        {
                            this.state.shops.map( (element) => <option key = {element.shopId} value = {element.shopId}>{element.name}</option> )
                        }                        
                    </select>
                </div>
                <div>
                    <Label>Choose Provider  <h6>* optional</h6></Label>
                    <select id="providers" onChange = {this.onChange}>
                        <option key = "" value = ""> select</option>
                        {
                            this.state.providers.map( (element) => <option key = {element.providerId} value = {element.providerId}>{element.name}  {element.surname}</option> )
                        }                        
                    </select>
                </div>
            </form>
        </div>
        )
    }
}