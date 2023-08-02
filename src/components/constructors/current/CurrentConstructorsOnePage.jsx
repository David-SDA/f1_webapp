import React from "react";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentConstuctorsOnePage(){
    let { constructorId } = useParams();
    
    return (
        <Container>
            <h1>{constructorId}</h1>
        </Container>
    );
}