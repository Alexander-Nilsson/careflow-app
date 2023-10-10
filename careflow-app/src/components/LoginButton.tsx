import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

function LoginButton() {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        <Button className="form-control" size="lg" variant="primary" onClick={() => loginWithRedirect()}>
            Login
        </Button>
    )
}

export default LoginButton