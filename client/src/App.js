import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import Home from './Components/HomePage/HomePage'
import Products from './Components/Products/Products';
import Shops from './Components/Shops/Shops';
import Providers from './Components/Providers/Providers';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthed : false
    }
  }
  autentication = (isAuthed) => {
    this.setState({isAuthed:isAuthed})
  }
    render(){
  return (
      <BrowserRouter>
        <Route path='/' exact render = {(props)=><Login {...props} isAuthed ={this.state.isAuthed} autentication={this.autentication} />}  />
        <Route path='/home' exact render = {(props)=><Home {...props} isAuthed ={this.state.isAuthed} autentication={this.autentication} />}/>
        <Route path = '/products' exact component = {Products} />
        <Route path = '/providers' exact component = {Providers} />
        <Route path = '/shops' exact component = {Shops} />
      </BrowserRouter>
  );
  }
}

export default App;
