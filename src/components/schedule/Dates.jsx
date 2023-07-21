import React from "react";

import { Container } from "react-bootstrap";
import OneDate from "./OneDate";

export default function Dates({dateDebut, dateFin}){
    return (
        <Container className="d-flex flex-row align-items-center mt-2 border-2 border-black border-bottom border-end rounded-4">
            <OneDate date={dateDebut} />
            <p style={{fontFamily: "Formula1-Wide"}}>-</p>
            <OneDate date={dateFin} />
        </Container>
    );
}