import React, { useEffect, useState } from "react";

import RaceSprintResultsHeaderContainer from "./RaceSprintResultsHeaderContainer";
import RaceResultsContentContainer from "./RaceResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function RaceResultsContainer({round}){
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/" + round + "/results.json");
            const data = await response.json();
            setResults(data.MRData.RaceTable.Races[0].Results);
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
            <Container className="p-0">
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <RaceSprintResultsHeaderContainer type={"Race"} />
                    {
                        results.map((result, index) => {
                            return (
                                <RaceResultsContentContainer
                                    position={result?.positionText}
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
}