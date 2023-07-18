import React from "react";
import { Badge, Container } from "react-bootstrap";

export default function Round({round}){
    return (
        <Badge bg="light" text="dark" className="d-flex flex-column justify-content-center align-items-center shadow rounded-3">
            <h6 style={{fontFamily: "Formula1-Regular"}}>Round</h6>
            <h5 style={{fontFamily: "Formula1-Wide"}}>{round}</h5>
        </Badge>
    );
}