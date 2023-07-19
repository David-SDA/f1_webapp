import React from "react";

import { Badge, Container } from "react-bootstrap";

export default function SmallDriver({position, firstName, name, points, color}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color
    };

    return (
        <Container className="d-flex flex-row justify-content-start align-items-center bg-white mb-2 rounded-3 p-2">
            <span style={{fontFamily: "Formula1-Wide", width: 23}}>{position}</span>
            <div className="ms-1 rounded-3" style={MyBar}></div>
            <span className="h5 ms-1 mb-0" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.001rem"}}><span className="d-none d-sm-inline">{firstName}</span> <span style={{fontFamily: "Formula1-Bold", letterSpacing: "0.001rem"}}>{name}</span></span>
            <span className="text-center ms-auto p-2 rounded-5" style={{fontFamily: "Formula1-Bold", backgroundColor: "#e8e8e8", fontSize: 12}}>{points} <span style={{fontFamily: "Formula1-regular"}}>PTS</span></span>
        </Container>
    );
}