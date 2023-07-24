import React from "react";

import { flags } from "../../constants/flags";

import { Container, Image } from "react-bootstrap";

export default function SmallRoundFlagContainer({round, country}){
    return (
        <Container className="d-flex justify-content-between align-items-center p-0">
            <p className="m-0" style={{fontFamily: "Formula1-Regular"}}>Round {round}</p>
            <Image src={flags[country]} alt={"Flag of " + country} className="border rounded-3" height={30} />
        </Container>
    );
}