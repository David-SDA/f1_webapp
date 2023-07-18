import React from "react";

import { Container } from "react-bootstrap";

export default function Session({sessionName, date}){
    return (
        <Container className="d-flex flex-column justify-content-evenly ms-1">
            <span className="h6" style={{fontFamily: "Formula1-Bold"}}>{sessionName}</span>
            <span style={{fontFamily: "Formula1-Regular"}}>{date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</span>
        </Container>
    );
}