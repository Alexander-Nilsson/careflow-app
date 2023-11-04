import React, { useState } from "react";
import { FormControl, Container, Button } from 'react-bootstrap';
import { db } from "../firebase";
import { doc, addDoc, collection } from "firebase/firestore";
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

    const ideaInputStyle = {
        maxHeight: "80px"
    }

    const [value, setValue] = React.useState('');
    const { isAuthenticated, user } = useAuth0();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // setValue(event.target.value);
        console.log("hej")
    };

    const handleClick = async () => {
        if (isAuthenticated) {
            await addDoc(collection(db, "suggestions"), {
                centrum: "Los Angeles",
                clinic: "CA",
                date_created: "USA",
                description: "hej",
                place: "hej",
                title: "hej"
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
                    style = {ideaInputStyle}
                />
                <Button variant="primary" onClick={handleClick} className="mt-2">
                    Skicka förslag
                </Button>
            </Container>

        </div>
    );
}

export default IdeasSection;