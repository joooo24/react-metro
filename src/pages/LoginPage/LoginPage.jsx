import React from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { ReactComponent as MainLogo } from "../../assets/images/mainlogo.svg";
import {Form, Button} from "react-bootstrap"

const LoginPage = ({setAuth})=>{
    const navigate = useNavigate(); 

    const loginUser = (event)=>{
        event.preventDefault();
        setAuth(true)
        navigate('/')
    }
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-logo-area">
                    <MainLogo />
                </div>
                <div className="login-form">
                    <Form onSubmit={(event)=>loginUser(event)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                          로그인
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;