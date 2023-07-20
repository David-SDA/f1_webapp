import React from "react";

import { Container } from "react-bootstrap";

export default function Dates({dateDebut, dateFin}){
    const dateStyle = {
        fontFamily: "Formula1-Wide",
        fontSize: 12,
    }

    return (
        <Container className="d-flex flex-row align-items-center mt-2 border-2 border-black border-bottom border-end rounded-4">
            <Container className="d-flex flex-column align-items-center">
                <p className="m-0" style={dateStyle}>{dateDebut.toLocaleDateString("en-GB", {day: "2-digit"})}</p>
                <p className="m-0" style={dateStyle}>{dateDebut.toLocaleDateString("en-GB", {month: "short"})}</p>
            </Container>
            <p style={{fontFamily: "Formula1-Wide"}}>-</p>
            <Container className="d-flex flex-column align-items-center">
                <p className="m-0" style={dateStyle}>{dateFin.toLocaleDateString("en-GB", {day: "2-digit"})}</p>
                <p className="m-0" style={dateStyle}>{dateFin.toLocaleDateString("en-GB", {month: "short"})}</p>
            </Container>
        </Container>
    );
}