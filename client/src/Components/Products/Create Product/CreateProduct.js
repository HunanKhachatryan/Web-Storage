import React from 'react'
import { Button, Input } from 'reactstrap'

export default class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            productName: '',
            productPrice: '',
            productDate:  Date,
            expiration:  Date,
            productImg: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }
    onChange(e){
        switch (e.target.id){
            case "product name":
                this.setState({productName:e.target.value});
                break;
            case "product price":
                this.setState({productPrice:e.target.value});
                break;
            case "product date":
                this.setState({productDate:e.target.value});
                break;
            case "product expiration":
                this.setState({expiration:e.target.value});
                break;
            case "product image":
                this.setState({ productImg: e.target.files[0]});
                break;
             default: break;
        }
    }

    async handleSubmit (e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('productName', this.state.productName);
        formData.append('productPrice', this.state.productPrice);
        formData.append('productDate', this.state.productDate);
        formData.append('expiration', this.state.expiration);
        formData.append('productImg', this.state.productImg,this.state.productImg.name);
        console.log(this.state.productImg)
      let response = await fetch('http://localhost:8080/products', {
        method: 'POST', 
        body: formData
      });
      if (response.status === 200) {
        this.props.getProducts()
        this.props.toggle()
      }
    }
    render() {
        return (
        <form onSubmit = {this.handleSubmit}>
            <div className = "form-group">
                <Input type = "text" id = "product name" pattern="^[A-Za-z0-9_]+( [A-Za-z0-9_" onChange = {this.onChange} placeholder= "Name" required />
            </div>
            <div className = "form-group">
                <Input type = "number" id = "product price" pattern="[0-9]{20}" onChange = {this.onChange} placeholder= "Price" required/>
            </div>
            <div className = "form-group">
                <Input type = "date" id = "product date" onChange = {this.onChange} required/>
            </div>
            <div className = "form-group">
                <Input  type = "date" id = "product expiration" onChange = {this.onChange} required/>
            </div>
            <div className = "form-group">
                <Input type = "file" id = "product image" onChange={this.onChange} required />
            </div>  
            <div className = "form-group">
                <Button color ="primary" type ="submit" id ="Upload" >Upload</Button>
            </div>
        </form>
        )
    }
}