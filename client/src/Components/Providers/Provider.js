import React from 'react'
import { Button } from 'reactstrap'
import style from './Provider.module.css'
class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            surname:'',
            phone:'',
            img: null,
            email:''
        };  
    }
    onMouseEnterHandler (event){
        event.target.style.borderColor = 'aqua'
          
    }
    onMouseLeaveHandler (event){
        event.target.style.borderColor = '#f3eee7'
          
    }
    onClick = async (e) =>{
        let providerId =  e.target.value
        try {
            const result = await fetch('http://localhost:8080/providers?providerId=' + providerId, {
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
    componentDidMount = async ()=>{
        try { 
            var arrayBufferView = new Uint8Array( this.props.img.data );
            let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );              
             this.setState({img:URL.createObjectURL(blob),id:this.props.id})
        }catch (error) {
            alert(`${error}`);
        }
    }
    
    render(){
        return(<div className = {style.productdiv} onMouseMove = {this.onMouseEnterHandler}  onMouseLeave = {this.onMouseLeaveHandler} >
                    <div className = {style.imageDiv} >
                        <img className = {style.img} src = {this.state.img} alt = {"img"}></img>
                    </div>
                    <div className = {style.div}>
                        <p>Name: {this.props.name}</p>
                        <p>SurName: {this.props.surname}</p>
                        <p> Phone:{this.props.phone}</p>
                    </div>
                    <div>
                        <Button color="danger" value ={this.props.id} onClick ={this.onClick}>Remove</Button>
                    </div>
                </div>
                );
    }
}
export default Provider;