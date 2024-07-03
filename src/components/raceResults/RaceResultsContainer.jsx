import React from "react";

import RaceSprintResultsHeaderContainer from "./RaceSprintResultsHeaderContainer";
import RaceSprintResultsContentContainer from "./RaceSprintResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container } from "react-bootstrap";

export default function RaceResultsContainer({raceResults}){
    return (
        <Container className="p-0">
            <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
            <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                <RaceSprintResultsHeaderContainer type={"Race"} />
                {
                    raceResults.map((result, index) => {
                        return (
                            <RaceSprintResultsContentContainer
                                type={"Race"}
                                driverId={result?.Driver?.driverId}
                                position={result?.positionText}
                                startingPosition={""}
                                color={currentConstructorColor[result?.Constructor?.constructorId]}
                                firstName={result?.Driver?.givenName}
                                familyName={result?.Driver?.familyName}
                                code={result?.Driver?.code}
                                fastestLap={result?.FastestLap?.Time?.time}
                                fastestLapRank={result?.FastestLap?.rank}
                                totalTime={result?.Time?.time}
                                status={result?.status}
                                points={result?.points}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        </Container>
    );
}