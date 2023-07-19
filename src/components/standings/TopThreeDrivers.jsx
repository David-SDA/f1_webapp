import React from "react";

import SmallDriver from "./SmallDriver";

import { Container } from "react-bootstrap";

export default function TopThreeDrivers(){
    return (
        <Container className="p-0">
            <SmallDriver position={"1"} firstName={"ee"} name={"Magnussen"} />
            <SmallDriver position={"2"} firstName={"ee"} name={"Verstappen"} />
            <SmallDriver position={"3"} firstName={"ee"} name={"Hulkenberg"} />
        </Container>
    );
}