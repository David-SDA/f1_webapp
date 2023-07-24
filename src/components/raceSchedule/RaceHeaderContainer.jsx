import React from "react";

import RoundFlagContainer from "./RoundFlagContainer";
import TitleRaceContainer from "./TitleRaceContainer";

import { Container } from "react-bootstrap";

export default function RaceHeaderContainer({round, raceName, country}){
    return (
        <Container className="d-flex flex-column align-items-center">
            <RoundFlagContainer round={round} country={country} />
            <TitleRaceContainer raceName={raceName} />
        </Container>
    );
}