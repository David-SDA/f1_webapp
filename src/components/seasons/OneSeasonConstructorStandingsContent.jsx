import React from "react";
import { Col, Row } from "react-bootstrap";

export default function OneSeasonConstructorStandingsContent({
    position,
    name,
    constructorId,
    wins,
    points
}){
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textWide}>
                    {position}
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={6} md={7} lg={7}>
                <p className="m-0" style={textBold}>
                    <a href={"/allConstructors/" + constructorId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                        {name}
                    </a>
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" xs={3} sm={2} md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    {wins}
                </p>
            </Col>
            <Col className="p-0" xs={3} sm={2} md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    {points}
                </p>
            </Col>
        </Row>
    )
}