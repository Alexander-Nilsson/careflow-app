import React from "react";
import {
  MDBInput
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase"
import "./LoginModal.css";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

function LoginModal() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setAlert] = useState('')
  const navigate = useNavigate();
  

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(email, password)

    if (await signIn(email, password)) {
      navigate('/start');
    } else {
      setAlert('true');
    };
  }

  return (
    <div className="log-in">
      <img className="background-gradient" alt="" src="./background-gradient.png" />
      <img className="careflow-icon" alt="" src="./CareFlow_Vit.png" />
      <img className="rog-login" alt="" src="/ROG-login.png" />
      <div className="log-in-component">
        <form className="form-group" onSubmit={handleLogin}>
        <Button className="custom-button" size="lg" type="submit">
            Logga in
          </Button>
          <div className="form-links">
            <TermsModal />
            <PrivacyModal />
          </div>
          
          
        </form>
      </div>
     
    </div>
    

  );
}

export default LoginModal;
