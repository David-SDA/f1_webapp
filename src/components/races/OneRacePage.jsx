import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Container, Spinner, Row, Col } from "react-bootstrap";

import OneRaceResultsHeader from "./OneRaceResultsHeader";

export default function OneRacePage(){
    const { season, round } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    if(!isLoading){
        return (
            <Spinner animation="border" className="mt-2 align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>Test Grand Prix</h1>
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <OneRaceResultsHeader />
                </Container>
            </Container>
        );
    }
}