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
import { app } from '../firebase'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function LoginModal() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setAlert] = useState('')
  const navigate = useNavigate();


  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/start');
      })
      .catch((error) => {
        setAlert('true');
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

              <h5 className="fw-normal mb-2">Sign into your account</h5>
              <form className="form-group" onSubmit={handleLogin}>
                <label>Email</label>
                <MDBInput
                  className="form-control mb-2"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <MDBInput
                  className="form-control mb-2"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* {showAlert && <label className="text-danger">Wrong credentials</label>} */}
                <Button className="form-control" size="lg" variant="primary" type="submit">
                  Login
                </Button>
                {showAlert && <small className="form-text text-danger">Wrong credentials</small>}
              </form>
              <Link className="small text-muted" to="/resetpassword">
                Forgot password?
              </Link>
              {/* <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="#!" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p> */}


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
    </MDBContainer >
  );
}

export default LoginModal;
