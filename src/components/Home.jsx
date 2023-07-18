import React from "react";
import RaceContainer from "./raceComponents/RaceContainer";

import { Container } from "react-bootstrap";

export default function Home(){
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center border border-primary">
            <h1 className="align-self-start fst-italic ms-5" style={{fontFamily: 'Formula1-Regular'}} >Next Race</h1>
            <RaceContainer round={'next'} />
        </Container>
    );
}