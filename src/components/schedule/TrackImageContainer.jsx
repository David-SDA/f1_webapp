import React from "react";

import { currentYearTracks } from "../../constants/currentYearTracks";

import { Container, Image } from "react-bootstrap";

export default function TrackImageContainer({heightSize, circuitId, country}){
    if(heightSize){
        return (
            <Container className="d-flex justify-content-center align-items-center mb-2" style={{height: heightSize}}>
                <Image src={currentYearTracks[circuitId]} alt={"Flag of " + country} className="w-100 h-100 object-fit-contain"/>
            </Container>
        );
    }
    else{
        return (
            <Container className="d-flex justify-content-center align-items-center mb-2">
                <Image src={currentYearTracks[circuitId]} alt={"Flag of " + country} className="w-100 h-100 object-fit-contain"/>
            </Container>
        );
    }
}