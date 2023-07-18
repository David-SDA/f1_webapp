import React from "react";

import SmallDriver from "./SmallDriver";

import { Container } from "react-bootstrap";

export default function TopThree(){
    return (
        <Container className="p-0">
            <SmallDriver position={"1"} name={"Driver 1"} />
            <SmallDriver position={"2"} name={"Driver 2"} />
            <SmallDriver position={"3"} name={"Driver 3"} />
        </Container>
    );
}