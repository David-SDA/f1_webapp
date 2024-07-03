import React from "react";

import QualifyingResultsHeaderContainer from "./QualifyingResultsHeaderContainer";
import QualifyingResultsContentContainer from "./QualifyingResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container } from "react-bootstrap";

export default function QualifyingResultsContainer({qualifyingResults}){
    return (
        <Container className="p-0 mt-3">
            <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Qualifying Results</p>
            <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                <QualifyingResultsHeaderContainer />
                {
                    qualifyingResults.map((result, index) => {
                        return (
                            <QualifyingResultsContentContainer
                                driverId={result?.Driver?.driverId}
                                position={result?.position}
                                color={currentConstructorColor[result?.Constructor?.constructorId]}
                                firstName={result?.Driver?.givenName}
                                familyName={result?.Driver?.familyName}
                                code={result?.Driver?.code}
                                q1={result?.Q1}
                                q2={result?.Q2}
                                q3={result?.Q3}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        </Container>
    );
}