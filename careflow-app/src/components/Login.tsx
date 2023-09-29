import LoginModal from "./LoginModal";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'

function Login() {
  return (
    <>
      <LoginModal />
    </>
  );
}

export default Login;
