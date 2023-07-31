import React from "react";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    return (
        <Container>
            <h1>{driverId}</h1>
        </Container>
    );
}