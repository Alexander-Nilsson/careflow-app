import React from "react";
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';
import "./LoginModal.css";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

function LoginModal() {

  const { loginWithRedirect } = useAuth0();


  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginWithRedirect();
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
