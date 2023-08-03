import React from "react";

import { Container } from "react-bootstrap";

export default function SmallDriverContainer({position, firstName, name, points, color, driverId}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color
    };

    return (
        <a href={"/currentDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
            <Container className="d-flex flex-row justify-content-start align-items-center bg-white mb-2 rounded-3 p-2">
                <p className="m-0" style={{fontFamily: "Formula1-Wide", width: 23}}>{position}</p>
                <div className="ms-1 rounded-3" style={MyBar}></div>
                <p className="h5 ms-1 mb-0" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.001rem"}}>
                    {
                        firstName ? (
                            <span className="d-none d-sm-inline">{firstName} </span>
                        ) : ("")
                    }
                    <span style={{fontFamily: "Formula1-Bold", letterSpacing: "0.001rem"}}>{name}</span>
                </p>
                {
                    points? (
                        <p className="m-0 text-center ms-auto p-2 rounded-5" style={{fontFamily: "Formula1-Bold", backgroundColor: "#e8e8e8", fontSize: 12}}>{points} <span style={{fontFamily: "Formula1-regular"}}>PTS</span></p>
                    ) : ("")
                }
            </Container>
        </a>
    );
}