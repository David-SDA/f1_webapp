import React from "react";

import DriverStandingsHeaderContainer from "./DriverStandingsHeaderContainer";
import DriverStandingsContentContainer from "./DriverStandingsContentContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container } from "react-bootstrap";

export default function DriverStandingsPage() {
    return (
        <Container className="p-0">
            <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 : Driver Standings</h1>
            <Container className="rounded p-1" style={{backgroundColor: "#38383f"}}>
                <DriverStandingsHeaderContainer />
                <DriverStandingsContentContainer
                    position={"1"}
                    color={currentConstructorColor["red_bull"]}
                    givenName={"Max"}
                    familyName={"Verstappen"}
                    code={"VER"}
                    team={currentConstructorSmallText["red_bull"]}
                    wins={"9"}
                    points={"281"}
                />
            </Container>
        </Container>
    );
}
