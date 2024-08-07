import React from "react";

import { Container } from "react-bootstrap";

export default function SmallConstructorContainer({position, name, points, color, constructorId}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color
    };

    return (
        <a href={"/currentConstructors/" + constructorId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
            <Container className="d-flex flex-row justify-content-start align-items-center bg-white mb-2 rounded-3 p-2">
                <p className="m-0" style={{fontFamily: "Formula1-Wide", width: 23}}>{position}</p>
                <div className="ms-1 rounded-3" style={MyBar}></div>
                <p className="h5 ms-1 mb-0" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.001rem"}}>{name}</p>
                <p className="m-0 text-center ms-auto p-2 rounded-5" style={{fontFamily: "Formula1-Bold", backgroundColor: "#e8e8e8", fontSize: 12}}>{points} <span style={{fontFamily: "Formula1-regular"}}>PTS</span></p>
            </Container>
        </a>
    );
}