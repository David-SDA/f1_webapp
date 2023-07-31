import React from "react";

import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentDriversTeamId } from "../../../constants/currentDriversTeamId";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentDrivers } from "../../../constants/currentDrivers";

import { Card, Col, Image } from "react-bootstrap";

export default function CurrentDriversCard({
    driverId,
    nationality,
    givenName,
    familyName,
    permanentNumber,
}){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col md={6} lg={4} xl={3} className="mb-2">
            <Card className="rounded-5 overflow-hidden" style={{height: "300px"}}>
                <a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                    <Card.Header className="d-flex flex-row justify-content-between align-items-center text-white rounded-top-5 pt-3 pb-3" style={{backgroundColor: currentConstructorColor[currentDriversTeamId[driverId]]}}>
                        <Image src={flagsNationality[nationality]} rounded className="me-1 border" style={{height: 25}} />
                        <p className="mb-0"><span style={textRegular}>{givenName}</span> <span style={textBold}>{familyName}</span></p>
                        <p className="mb-0 fst-italic mt-1" style={textBlack}>{permanentNumber}</p>
                    </Card.Header>
                    <Card.Img variant="top" src={currentDrivers[driverId]} className="rounded-0" />
                </a>
            </Card>
        </Col>
    );
}