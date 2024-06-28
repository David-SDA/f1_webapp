import React from "react";

import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

export default function OneRacePage(){
    const { season, round } = useParams();

    return (
        <Container>
            <h1>OneRacePage</h1>
            <p>Season : {season}</p>
            <p>Round : {round}</p>
        </Container>
    );
}