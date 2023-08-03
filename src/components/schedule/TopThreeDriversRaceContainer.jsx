import React from "react";

import SmallDriverContainer from "../standings/SmallDriverContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container } from "react-bootstrap";

export default function TopThreeDriversRaceContainer({winner, second, third}){
    var winnerPosition = winner?.Results[0]?.position;
    var winnerName = winner?.Results[0]?.Driver?.familyName;
    var winnerId = winner?.Results[0]?.Driver?.driverId;
    var winnerTeamId = winner?.Results[0]?.Constructor?.constructorId;

    var secondPosition = second?.Results[0]?.position;
    var secondName = second?.Results[0]?.Driver?.familyName;
    var secondId = second?.Results[0]?.Driver?.driverId;
    var secondTeamId = second?.Results[0]?.Constructor?.constructorId;

    var thridPosition = third?.Results[0]?.position;
    var thirdName  = third?.Results[0]?.Driver?.familyName;
    var thridId = third?.Results[0]?.Driver?.driverId;
    var thirdTeamId = third?.Results[0]?.Constructor?.constructorId;

    return (
        <Container className="d-flex flex-column justify-content-center mb-2 pt-2 rounded-2" style={{backgroundColor: "#38383f", height: 170}}>
            <SmallDriverContainer
                position={winnerPosition}
                name={winnerName}
                color={currentConstructorColor[winnerTeamId]}
                driverId={winnerId}
            />
            <SmallDriverContainer
                position={secondPosition}
                name={secondName}
                color={currentConstructorColor[secondTeamId]}
                driverId={secondId}
            />
            <SmallDriverContainer
                position={thridPosition}
                name={thirdName}
                color={currentConstructorColor[thirdTeamId]}
                driverId={thridId}
            />
        </Container>
    );
}