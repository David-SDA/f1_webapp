import React from "react";
import { Container } from "react-bootstrap";

export default function AllDriversPage(){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    
    return (
        <Container>
            <h1 className="fst-italic mt-1" style={textRegular}>All Drivers</h1>
        </Container>
    );
}