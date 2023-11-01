import React, { useState } from "react";
import { FormControl, Container, Button } from 'react-bootstrap';
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from '@auth0/auth0-react';

function IdeasSection() {
    // You can define your project data here
    const ideasSectionStyle = {
        backgroundColor: "lightblue",
        width: "400px",
        height: "250px",
        borderRadius: "10px",
        margin: "10px",
        marginLeft: "20px",
        marginTop: "0px",
    };

    const [value, setValue] = React.useState('');
    const { isAuthenticated, user } = useAuth0();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleClick = async () => {
        if (isAuthenticated) {
            await setDoc(doc(db, "suggestions"), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
              });
        }
    };

    return (
        <div style={ideasSectionStyle}>
            <h1>Idé på förbättringsarbete</h1>
            <Container className="my-3">
                <FormControl
                    as="textarea"
                    value={value}
                    onChange={handleChange}
                    placeholder="Skicka in ett eget förslag på en förändring."
                    style={{ height: '100px' }}
                />
                <Button variant="primary" onClick={handleClick} className="mt-2">
                    Skicka förslag
                </Button>
            </Container>

        </div>
    );
}

export default IdeasSection;