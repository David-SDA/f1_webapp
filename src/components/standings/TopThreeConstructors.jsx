import React from "react";

import SmallConstructor from "./SmallConstructor";

import { Container } from "react-bootstrap";

export default function TopThreeConstructors(){
    return (
        <Container className="p-0">
            <SmallConstructor position={"1"} name={"Alpine F1 Team"} />
            <SmallConstructor position={"2"} name={"Aston Martin"} />
            <SmallConstructor position={"3"} name={"Alphatauri"} />
        </Container>
    );
}