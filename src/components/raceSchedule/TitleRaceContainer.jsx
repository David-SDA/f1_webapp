import React from "react";

import { Container } from "react-bootstrap";

export default function TitleRaceContainer({raceName}){
    return (
        <Container className="d-flex justify-content-center align-items-center mt-2">
            <h2 style={{fontFamily: "Formula1-Wide"}}>{raceName}</h2>
        </Container>
    );
}