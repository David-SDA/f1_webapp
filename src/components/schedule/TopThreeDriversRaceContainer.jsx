import React from "react";

import SmallDriverContainer from "../standings/SmallDriverContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container } from "react-bootstrap";

export default function TopThreeDriversRaceContainer({winner, second, third}){
    var winnerPosition = winner?.Results[0]?.position;
    var winnerName = winner?.Results[0]?.Driver?.familyName;
    var winnerTeamId = winner?.Results[0]?.Constructor?.constructorId;

    var secondPosition = second?.Results[0]?.position;
    var secondName = second?.Results[0]?.Driver?.familyName;
    var secondTeamId = second?.Results[0]?.Constructor?.constructorId;

    var thridPosition = third?.Results[0]?.position;
    var thirdName  = third?.Results[0]?.Driver?.familyName;
    var thirdTeamId = third?.Results[0]?.Constructor?.constructorId;

    return (
        <Container className="d-flex flex-column justify-content-center mb-2 pt-2 rounded-2" style={{backgroundColor: "#38383f", height: 170}}>
            <SmallDriverContainer
                position={winnerPosition}
                name={winnerName}
                color={currentConstructorColor[winnerTeamId]}
            />
            <SmallDriverContainer
                position={secondPosition}
                name={secondName}
                color={currentConstructorColor[secondTeamId]}
            />
            <SmallDriverContainer
                position={thridPosition}
                name={thirdName}
                color={currentConstructorColor[thirdTeamId]}
            />
        </Container>
    );
}