import React from "react";

import RaceSprintResultsHeaderContainer from "./RaceSprintResultsHeaderContainer";

import { Container } from "react-bootstrap";

export default function SprintResultsContainer(){
    return (
        <Container className="p-0">
            <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Sprint Results</p>
            <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                <RaceSprintResultsHeaderContainer type={"Sprint"} />
            </Container>
        </Container>
    );
}