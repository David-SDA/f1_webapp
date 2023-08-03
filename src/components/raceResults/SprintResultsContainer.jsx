import React, { useEffect, useState } from "react";

import RaceSprintResultsHeaderContainer from "./RaceSprintResultsHeaderContainer";
import RaceSprintResultsContentContainer from "./RaceSprintResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function SprintResultsContainer({round}){
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/" + round + "/sprint.json");
            const data = await response.json();
            setResults(data.MRData.RaceTable.Races[0].SprintResults);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    if(isLoading){
        return (
            <Spinner animation="border" className="mt-2 align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0 mt-3">
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Sprint Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <RaceSprintResultsHeaderContainer type={"Sprint"} />
                    {
                        results.map((result, index) => {
                            return (
                                <RaceSprintResultsContentContainer
                                    type={"Sprint"}
                                    driverId={result?.Driver?.driverId}
                                    position={result?.positionText}
                                    startingPosition={result?.grid}
                                    color={currentConstructorColor[result?.Constructor?.constructorId]}
                                    firstName={result?.Driver?.givenName}
                                    familyName={result?.Driver?.familyName}
                                    code={result?.Driver?.code}
                                    fastestLap={""}
                                    fastestLapRank={""}
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
}