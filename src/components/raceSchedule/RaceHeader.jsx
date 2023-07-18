import React from "react";

import RoundFlag from "./RoundFlag";
import TitleRace from "./TitleRace";

import { Container } from "react-bootstrap";

export default function RaceHeader({round, raceName, country}){
    return (
        <Container className="d-flex flex-column align-items-center">
            <RoundFlag round={round} country={country} />
            <TitleRace raceName={raceName} />
        </Container>
    );
}