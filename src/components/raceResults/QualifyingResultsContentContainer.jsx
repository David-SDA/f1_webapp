import React from "react";

import { Col, Row } from "react-bootstrap";

export default function QualifyingResultsContentContainer({
    driverId,
    position,
    color,
    firstName,
    familyName,
    code,
    q1,
    q2,
    q3,
}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color,
    };

    const regularText = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    const boldText = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    };

    const wideText = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    };

    return (
        <a href={"/currentDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-opacity-75-hover">
            <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">                    
                <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                    <p className="m-0 text-center text-xs" style={wideText}>
                        {position}
                    </p>
                </Col>
                <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                    <div className="rounded-3" style={MyBar}></div>
                </Col>
                <Col className="p-0" xs={2} sm={3} md={4} lg={4}>
                    <p className="m-0 d-none d-sm-block" style={boldText}>
                        <span className="d-none d-md-inline" style={regularText}>{firstName} </span> 
                        {familyName}
                    </p>
                    <p className="m-0 d-block d-sm-none" style={boldText}>
                        <span style={{fontSize: 12}}>{code}</span>
                    </p>
                </Col>
                <Col className="p-0" xs={2} sm={2} md={2} lg={2}>
                    <p className="m-0 text-center" style={regularText}>
                        {
                            q1 ? (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>{q1}</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>{q1}</span>
                                </>
                            ) : (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>--:--:---</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                </>
                            )
                        }
                    </p>
                </Col>
                <Col className="p-0"  xs={2} sm={2} md={2} lg={2}>
                    <p className="m-0 text-center" style={regularText}>
                        {
                            q2 ? (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>{q2}</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>{q2}</span>
                                </>
                            ) : (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>--:--:---</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                </>
                            )
                        }
                    </p>
                </Col>
                <Col className="p-0" xs={2} sm={2} md={2} lg={2}>
                    <p className="m-0 text-center" style={regularText}>
                        {
                            q3 ? (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>{q3}</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>{q3}</span>
                                </>
                            ) : (
                                <>
                                    <span className="d-inline d-sm-none" style={{fontSize: 10}}>--:--:---</span>
                                    <span className="p-1 rounded-5 d-none d-sm-inline" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                </>
                            )
                        }
                    </p>
                </Col>
            </Row>
        </a>
    );
}