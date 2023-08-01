import React from "react";

import { Col, Row } from "react-bootstrap";

export default function CurrentDriversThisSeasonQualifyingContentContainer({
    round,
    raceName,
    position,
    q1,
    q2,
    q3,
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
        <Row className="bg-white ms-1 me-1 mt-2 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-flex p-0 justify-content-center align-items-center ">
                <p className="mb-0 text-center" style={textBlack}>{round}</p>
            </Col>
            <Col xs={8} sm={4} md={4} lg={4} className="d-flex justify-content-center align-items-center p-0">
                <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                    <p className="d-flex d-lg-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{raceName}</p>
                    <p className="d-none d-lg-flex align-items-center mb-0 text-center" style={textBold}>{raceName}</p>
                </a>
            </Col>
            <Col xs={4} sm={1} md={1} lg={1} className="d-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textBold}>{position}</p>
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textRegular}>
                    {
                        q1 ? (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{q1}</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{q1}</span>
                            </>
                        ) : (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                            </>
                        )
                    }
                </p>
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textRegular}>
                    {
                        q2 ? (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{q2}</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{q2}</span>
                            </>
                        ) : (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                            </>
                        )
                    }
                </p>
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textRegular}>
                    {
                        q3 ? (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{q3}</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{q3}</span>
                            </>
                        ) : (
                            <>
                                <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                            </>
                        )
                    }
                </p>
            </Col>
        </Row>
    );
}