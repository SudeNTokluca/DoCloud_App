"use client"
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@/styles/globals.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import   InputGroup  from 'react-bootstrap/InputGroup';
import '@/styles/styles.form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faUser,faKey,faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons'

const LogIn: React.FC = () => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    router.push('/dashboard');
  };

  return (
    <div className="page ">
      <div className="frame p-4 page d-flex flex-wrap justify-content-center align-items-center flex-column">
        {/* Diğer oturum açma seçeneklerinin bulunduğu Card component */}
        <Card className="bg-white mb-3 card ">
          <div className="d-flex row justify-content-center">
            <div className="m-2 circle d-flex justify-content-center ">
              <FontAwesomeIcon icon={faGoogle} className="icons" />
            </div>
            <div className="m-2 circle"></div>
            <div className="m-2 circle"></div>
          </div>
        </Card>

        {/* Kullanıcı bilgilerinin girilerek oturum açmanın gerçekleştirildiği Card component */}
        <Card className="bg-white p-3 card">
          <Form className="d-flex flex-wrap justify-content-center">
            {/* Username field */}
            <Form.Group className="box d-flex justify-content-sm-between">
              <Form.Label>
                <FontAwesomeIcon icon={faUser} className="icons" />
              </Form.Label>
              <Form.Control
                placeholder="USERNAME"
                className="inputs text-center "
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Form.Label className="icons"></Form.Label>
            </Form.Group>

            {/* Password field */}
            <Form.Group className="box d-flex justify-content-sm-between">
              <Form.Label>
                <FontAwesomeIcon icon={faKey} className="icons" />
              </Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="PASSWORD"
                className="inputs text-center "
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                className='icon-buttons'
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className="icons" />
                ) : (
                  <FontAwesomeIcon icon={faEye} className="icons" />
                )}
              </Button>
            </Form.Group>

            {/* Login Button */}
            <Button onClick={onSubmit} className=" box btn btn-outline-light text-light button">
              LOG IN
            </Button>
          </Form>
        </Card>
        <br />

        {/* SignUp */}
        <Link href="/signup" passHref>
            <p className="d-flex flex-wrap justify-content-center white link">
                DON’T HAVE AN ACCOUNT?
             </p>
        </Link>

      </div>
    </div>
  );
};

export default LogIn;
