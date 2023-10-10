import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

function LogoutButton() {
    const { logout} = useAuth0();

    return (
        <Button className="form-control" size="lg" variant="primary">
            Login
        </Button>
    )
}

export default LogoutButton