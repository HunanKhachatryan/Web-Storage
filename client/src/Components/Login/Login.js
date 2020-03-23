import React from 'react'
import { Container, Col, Form, Row, Input, Button } from 'reactstrap'
import style from './Login.module.css'
import { Link } from 'react-router-dom'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const user  = this.state;
        try {

            const result = await fetch('http://localhost:8080/signin', {
                method: 'Post',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify( user)
            })                
            const myJson = await result.json();
            if(200 === result.status){
                setCookie("isAuthed","true",1)
                setCookie("accessToken",myJson.accessToken,1)
                this.sendData(true)
                this.props.history.push('/home');

              }else{
                this.sendData(false)
                alert(myJson.message);
            }
                
        }catch (error) {
            alert(`Password or Username is false ${error}`);
        }
        
    }
    sendData(isAuthed){
        this.props.autentication(isAuthed);
   }
    render(){
        return(
            <div className={style.App}>
            <Form className={style.form} onSubmit={this.handleSubmit}>
                    <Container>
                        <Row>
                            <Col md="6">
                                <h2>Sign In</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Passord"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md ="6" >
                                <Button className = {style.signInButton} onSubmit = {this.handleSubmit}>Sign in </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md ="6">
                                <Link to = "/reset" className = "comp-class" ><p className = {style.forgot}> Forgot password ? </p></Link>
                            </Col>
                        </Row>
                    </Container>
                </Form>

            </div>

        );
    }
}
function setCookie(cname, cvalue, exHours) {
    var d = new Date();
    d.setTime(d.getTime() + (exHours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
export default Login