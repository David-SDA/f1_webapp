import React from "react";

import { currentDriversSideImage } from "../../../constants/currentDriversSideImage";
import { flagsNationality } from "../../../constants/flagsNationality";

import { Col, Container, Image, Row } from "react-bootstrap";

export default function CurrentConstructorsDetailsContainer({
    image,
    flag,
    nationality,
    drivers,
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
        <Row className="mb-2 mb-md-0">
            <Col md={6} lg={4} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                <Image src={image} className="img-fluid rounded-4" style={{maxHeight: "300px", objectFit: "contain"}} />
            </Col>
            <Col md={6} lg={8} className="d-flex flex-column justify-content-center">
                <Row className="d-flex justify-content-center">
                    <Col lg={12} className="mb-2">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>NATIONALITY</p>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Image src={flag} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0" style={{...textBold, fontSize: "24px"}}>{nationality}</p>
                            </div>
                            <div></div>
                        </Container>
                    </Col>
                    {
                        drivers.map((driver, index) => {
                            return (
                                <Col lg={6} className="mb-3" key={index}>
                                    <a href={"/currentDrivers/" + driver?.driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                                        <Container className="d-flex flex-column justify-content-between rounded-4" style={{height: "200px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    <Image src={flagsNationality[driver?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                                    <p className="mb-0 fst-italic">
                                                        <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                                                    </p>
                                                </div>
                                                <p className="mb-0 fst-italic" style={{...textBlack, fontSize: 20}}>
                                                    {driver?.permanentNumber}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <Image src={currentDriversSideImage[driver?.driverId]} style={{height: 160, width: 160}} />
                                            </div>
                                        </Container>
                                    </a>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Col>
        </Row>
    );
}