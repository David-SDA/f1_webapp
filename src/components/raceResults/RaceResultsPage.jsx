import React from "react";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RaceContainer from "../raceSchedule/RaceContainer";

export default function RaceResultsPage(){
    let { round } = useParams();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center pt-3 pb-3">
            <RaceContainer round={round} />
            <p>Race Results</p>
            <p>Qualifying Results</p>
            <p>Sprint Results</p>
        </Container>
    );
}