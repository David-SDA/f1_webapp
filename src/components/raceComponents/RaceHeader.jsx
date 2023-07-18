import React from "react";

import Round from "./Round";
import FlagTitleRace from "./FlagTitleRace";

import { Container } from "react-bootstrap";

export default function RaceHeader({round, raceName, country}){
    return (
        <Container className="d-flex flex-row align-items-center">
            <Round round={round} />
            <FlagTitleRace raceName={raceName} country={country} />
        </Container>
    );
}