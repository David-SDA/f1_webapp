import React from "react";

import RaceContainer from "./raceSchedule/RaceContainer";
import SmallStandingsContainer from "./standings/SmallStandingsContainer";

import { Container } from "react-bootstrap";

export default function Home(){
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <p className="h1 align-self-start fst-italic ms-3 mt-2" style={{fontFamily: "Formula1-Regular"}}>Current Standings</p>
            <SmallStandingsContainer />
            <p className="h1 align-self-start fst-italic ms-3" style={{fontFamily: "Formula1-Regular"}}>Next Race</p>
            <RaceContainer round={"next"} />
        </Container>
    );
}