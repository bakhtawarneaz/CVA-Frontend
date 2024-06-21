import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { useSkin } from "@hooks/useSkin";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import './Login.css'

import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

import InputPasswordToggle from "@components/input-password-toggle";
import toast from 'react-hot-toast';

const Login = () => {
  
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      navigate('/home');
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Username and password are required')
      return;
    }
    mutation.mutate({ username, password });
  };


  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to CVA! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit}
            >
              <div className="mb-1">
                <Label className="form-label" for="username">
                 User Name
                </Label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="admin"
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="password">
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <Button color="primary" block>
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  ) 
}

export default Login