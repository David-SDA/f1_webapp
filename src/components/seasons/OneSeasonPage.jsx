import React from "react";

import { Container } from "react-bootstrap";

import { useParams } from "react-router-dom";

export default function OneSeasonPage(){
    const { season } = useParams();

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    return (
        <Container>
            <h1 className="fst-italic mt-1" style={textRegular}>{season} Season</h1>
        </Container>
    )
}