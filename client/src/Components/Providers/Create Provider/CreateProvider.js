import React from 'react'
import { Button, Input } from 'reactstrap'

export default class CreateProduct extends React.Component {
    constructor(props) {
        super(props);

         this.state = {
            name: '',
            surname: '',
            phone: '',
            email: '',
            img: null
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }
    onChange(e){
        switch (e.target.id){
            case "provider name":
                this.setState({name:e.target.value});
                break;
            case "provider surname":
                this.setState({surname:e.target.value});
                break;
            case "provider phone":
                this.setState({phone:e.target.value});
                break;
            case "provider email":
                this.setState({email:e.target.value});
                break;
            case "provider image":
                this.setState({ img: e.target.files[0]});
                break;
             default: break;
        }
    }

    onClick  = async (e)=>{
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('surname', this.state.surname);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('image', this.state.img,this.state.img.name);
      let response = await fetch('http://localhost:8080/providers', {
        method: 'POST',
        body: formData
      });
      if (response.status === 200) {

        this.props.getProviders()
        this.props.toggle()
      }
      
    }
    render() {
        return (
        <form onSubmit = {this.onClick}>
            <div className = "form-group">
                <Input type = "text" id = "provider name" pattern="[A-Z]{1}[a-z]{2,15}" onChange = {this.onChange} placeholder= "Name" required />
            </div>
            <div className = "form-group">
                <Input type = "text" id = "provider surname" pattern="[A-Z]{1}[a-z]{2,20}" onChange = {this.onChange} placeholder= "Surname" required/>
            </div>
            <div className = "form-group">
                <Input type = "tel" id = "provider phone" pattern="[0-9]{9}" onChange = {this.onChange} placeholder= "Phone " required/>
            </div>
            <div className = "form-group">
                <Input  type = "email" id = "provider email" onChange = {this.onChange} placeholder= "Email" required/>
            </div>
            <div className = "form-group">
                <Input type = "file" id = "provider image" onChange={this.onChange} required />
            </div>
            <div className = "form-group">
                <Button color ="primary" type ="submit"  id ="Upload" >Upload</Button>
            </div>
        </form>
        )
    }
}