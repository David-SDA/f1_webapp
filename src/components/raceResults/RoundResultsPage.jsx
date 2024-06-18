import React, { useState } from "react";

import RaceContainer from "../raceSchedule/RaceContainer";
import RaceResultsContainer from "./RaceResultsContainer";
import QualifyingResultsContainer from "./QualifyingResultsContainer";

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SprintResultsContainer from "./SprintResultsContainer";

export default function RoundResultsPage(){
    // A regler pour l'affichage des gp qui n'ont pas encore eu lieu
    const [dateFromChild, setDateFromChild] = useState(null);

    let { round, format } = useParams();

    let dateGP = new Date(dateFromChild);
    let dateApresGP = dateGP.setHours(dateGP.getHours() + 6);

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center pt-3 pb-3 ps-1 pe-1">
            <RaceContainer round={round} />
            {
                new Date() > dateApresGP ? (
                    <>
                        <RaceResultsContainer round={round} />
                        <QualifyingResultsContainer round={round} />
                        {
                            format === "sprint" ? (
                                <SprintResultsContainer round={round} />
                            ) : ("")
                        }
                    </>
                ) : ("")
            }
        </Container>
    );
}