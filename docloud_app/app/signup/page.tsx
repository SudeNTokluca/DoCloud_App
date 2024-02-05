"use client"
import "@/styles/globals.css"
import '@/styles/styles.form.css';
import React from 'react';
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons'


const SignUp: React.FC = () => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className='page'>
      <div className='frame p-4 page d-flex flex-wrap justify-content-center align-items-center flex-column'>

        {/* Bilgilerin girildiği Card component */}
        <Card className='bg-white p-3 card'>
          <Form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center">
            <h1 className='w_header'>Welcome to DoCloud!</h1>

            {/* name field */}
            <Form.Group>
              <Form.Control
                placeholder="NAME"
                className="box half text-center"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* surname field */}
            <Form.Group>
              <Form.Control
                placeholder="SURNAME"
                className="box half text-center"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>

            {/* email field */}
            <Form.Group>
              <Form.Control
                placeholder="EMAIL"
                className="box text-center"
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* username field */}
            <Form.Group>
              <Form.Control
                placeholder="USERNAME"
                className="box text-center"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            {/* password field */}
            <Form.Group className="box d-flex justify-content-sm-between">
              <Form.Label className='icons'></Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="PASSWORD"
                className="inputs text-center"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className="icon-buttons"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className='icons' />
                ) : (
                  <FontAwesomeIcon icon={faEye} className='icons' />
                )}
              </Button>
            </Form.Group>

            <p className='footer'>
              By clicking the “SIGN UP” button, you are creating an account, and agree to DoCloud's Terms of Service and Privacy Policy
            </p>

            {/* Submit Button */}
            <Button as="input" type="submit" value="SIGN UP" className="box btn btn-outline-light text-light button" />
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
