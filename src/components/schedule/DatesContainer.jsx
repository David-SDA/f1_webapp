import React from "react";

import { Container } from "react-bootstrap";
import OneDateContainer from "./OneDateContainer";

export default function DatesContainer({dateDebut, dateFin}){
    return (
        <Container className="d-flex flex-row align-items-center mt-2 border-2 border-black border-bottom border-end rounded-4">
            <OneDateContainer date={dateDebut} />
            <p style={{fontFamily: "Formula1-Wide"}}>-</p>
            <OneDateContainer date={dateFin} />
        </Container>
    );
}