import React from "react";

import { flags } from "../../constants/flags";

import { Badge, Container, Image } from "react-bootstrap";

export default function RoundFlag({round, country}){
    return (
        <Container className="d-flex flex-row justify-content-between" style={{maxHeight: 80}}>
            <Badge bg="light" text="dark" className="d-flex flex-column justify-content-center align-items-center shadow rounded-3">
                <h6 style={{fontFamily: "Formula1-Regular"}}>Round</h6>
                <h5 style={{fontFamily: "Formula1-Wide"}}>{round}</h5>
            </Badge>
            <Image src={flags[country]} alt="Country's flag of the race location" className="rounded-4 border" width={120}/>
        </Container>
    );
}