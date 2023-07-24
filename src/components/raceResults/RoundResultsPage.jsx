import React from "react";

import RaceContainer from "../raceSchedule/RaceContainer";
import RaceResultsContainer from "./RaceResultsContainer";
import QualifyingResultsContainer from "./QualifyingResultsContainer";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SprintResultsContainer from "./SprintResultsContainer";

export default function RoundResultsPage(){
    let { round, format } = useParams();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center pt-3 pb-3 ps-1 ps-sm-3 pe-1 pe-sm-3">
            <RaceContainer round={round} />
            <RaceResultsContainer round={round} />
            <QualifyingResultsContainer />
            {
                format === "sprint" ? (
                    <SprintResultsContainer round={round} />
                ) : ("")
            }
        </Container>
    );
}