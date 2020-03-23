import React from 'react'
import { Button } from 'reactstrap'
import {getCookie} from '../../HomePage/HomePage'
export default class SaleProduct extends React.Component {
    constructor(props) {
        super(props);

         this.state = {
            providers:[],
            shops:[],
            providerId: '',
            shopId: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }
    onChange(e){
        switch (e.target.id){
            case "providers":
                this.setState({providerId:e.target.value});
                break;
            case "shops":
                this.setState({shopId:e.target.value});
                break;
             default: break;
        }
    }

    
    componentDidMount = async () => {
        let accessToken = getCookie("accessToken")
        const providers = await fetch('http://localhost:8080/providers', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AccessTocken': accessToken
            }
        })  
        const providerJson = await providers.json();
            if (200 === providers.status) {
                this.setState({
                    providers: providerJson
                })
            } else {
                alert(providers);
            }
        const shops = await fetch('http://localhost:8080/shops', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AccessTocken': accessToken
            }
        })  
        const shopsJson = await shops.json();
            if (200 === shops.status) {
                this.setState({
                    shops: shopsJson
                })
            } else {
                alert(shops);
            }
    }
    render() {
        return (
        <form onSubmit = {this.onSubmit}>
            <div className = "form-group">
            Shops:   
                <select id="shops" onChange = {this.onChange} >
                    <option value="select shop">Select Shop</option>
                    {this.state.shops.map((shop) =>
                        <option key={shop.shopId} value={shop.shopId}>{shop.name}</option>
                    )}
                </select>
            </div>
            <div className = "form-group">
            Providers: 
            <select id="providers" onChange = {this.onChange} >
                    <option value="select provider">Select Provider</option>
                    {this.state.providers.map((provider) =>
                        <option key={provider.providerId} value={provider.providerId}>{provider.name} {provider.surname}</option>
                    )}
                </select>
            </div>
            <div className = "form-group">
                <Button color ="primary" type ="submit" id ="Sale" >Sale</Button>
            </div>
        </form>
        )
    }
}