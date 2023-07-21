import React from "react";

import RaceResultsHeaderContainer from "./RaceResultsHeaderContainer";

import { Container } from "react-bootstrap";
import RaceResultsContentContainer from "./RaceResultsContentContainer";

export default function RaceResultsContainer(){
    return (
        <Container className="p-0">
            <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
            <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                <RaceResultsHeaderContainer />
                <RaceResultsContentContainer
                    position={"2"}
                    color={"red"}
                    firstName={"Charles"}
                    familyName={"Leclerc"}
                    code={"LEC"}
                    fastestLap={"1:28:358"}
                    fastestLapRank={"1"}
                    totalTime={"1:23:35:247"}
                    points={"18"}
                />
            </Container>
        </Container>
    );
}