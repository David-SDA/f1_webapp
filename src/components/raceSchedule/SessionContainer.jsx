import React from "react";

import { Container } from "react-bootstrap";

export default function SessionContainer({sessionName, date}){
    return (
        <Container className="d-flex flex-column justify-content-evenly ms-1">
            <p className="h6" style={{fontFamily: "Formula1-Bold"}}>{sessionName}</p>
            <p className="m-0" style={{fontFamily: "Formula1-Regular"}}>{date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
        </Container>
    );
}