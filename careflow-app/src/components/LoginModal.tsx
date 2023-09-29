import React from "react";
import { Link } from "react-router-dom"; //Replaces anchor link a.k.a <a>. href needs to be changed to "to"
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
// import history from 'history'\;
import Redirect from 'react-router-dom';

function LoginModal() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // return <Redirect to='/start' />
      })
      .catch((error) => {
        alert("wrong credentials!")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }



  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="./ROG.png"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <MDBCardImage
                  src="./CareFlow_Svart.png"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </div>

              <h5
                className="fw-normal my- pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button className="mb-4 px-5" size="lg" variant="primary" onClick={handleLogin}>
                Login
              </Button>
              <Link className="small text-muted" to="/resetpassword">
                Forgot password?
              </Link>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="#!" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <Link to="#!" className="small text-muted me-1">
                  Terms of use.
                </Link>
                <Link to="#!" className="small text-muted">
                  Privacy policy
                </Link>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginModal;
