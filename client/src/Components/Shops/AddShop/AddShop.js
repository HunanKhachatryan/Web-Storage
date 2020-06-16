import React from 'react'
import { Button, Input } from 'reactstrap'

export default class AddShop extends React.Component {
    constructor(props) {
        super(props);

         this.state = {
            name: '',
            address: '',
            phone: '',
            email: '',
            img: null
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }
    onChange(e){
        switch (e.target.id){
            case "shop name":
                this.setState({name:e.target.value});
                break;
            case "shop address":
                this.setState({address:e.target.value});
                break;
            case "shop phone":
                this.setState({phone:e.target.value});
                break;
            case "shop email":
                this.setState({email:e.target.value});
                break;
            case "shop image":
                this.setState({ img: e.target.files[0]});
                break;
             default: break;
        }
    }

    onClick  = async (e)=>{
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('address', this.state.address);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('image', this.state.img,this.state.img.name);
      let response = await fetch('http://localhost:8080/shops', {
        method: 'POST',
        body: formData
      });
      if (response.status === 200) {

        this.props.getShops()
        this.props.toggle()
      }
      
    }
    render() {
        return (
        <form onSubmit = {this.onClick}>
            <div className = "form-group">
                <Input type = "text" id = "shop name" pattern="^[A-Za-z0-9_]+( [A-Za-z0-9_]+)*$" onChange = {this.onChange} placeholder= "Name" required />
            </div>
            <div className = "form-group">
                <Input type = "text" id = "shop address" pattern="^[A-Za-z0-9_]+( [A-Za-z0-9_]+)*$" onChange = {this.onChange} placeholder= "Address" required/>
            </div>
            <div className = "form-group">
                <Input type = "tel" id = "shop phone" pattern="[0-9]{9}" onChange = {this.onChange} placeholder= "Phone " required/>
            </div>
            <div className = "form-group">
                <Input  type = "email" id = "shop email" onChange = {this.onChange} placeholder= "Email" required/>
            </div>
            <div className = "form-group">
                <Input type = "file" id = "shop image" onChange={this.onChange} required />
            </div>
            <div className = "form-group">
                <Button color ="primary" type ="submit"  id ="Upload" >Upload</Button>
            </div>
        </form>
        )
    }
}