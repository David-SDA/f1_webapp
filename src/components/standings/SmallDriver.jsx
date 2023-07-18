import React from "react";

import { Container } from "react-bootstrap";

export default function SmallDriver({position, name}){
    return (
        <Container className="bg-white mb-2 rounded-3 p-2">
            <span style={{fontFamily: "Formula1-Wide"}}>{position}</span>
            <div className="vr ms-2" style={{width: 7, backgroundColor: "#0000ff"}}></div>
            <span className="h5 ms-1" style={{fontFamily: "Formula1-Regular"}}>{name}</span>
        </Container>
    );
}