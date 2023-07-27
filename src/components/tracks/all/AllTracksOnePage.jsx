import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AllTracksOnePage(){
    let { circuitId } = useParams();

    return (
        <Container>
            <p>{circuitId}</p>
        </Container>
    );
}