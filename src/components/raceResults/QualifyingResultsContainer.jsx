import React, { useEffect, useState } from "react";

import QualifyingResultsHeaderContainer from "./QualifyingResultsHeaderContainer";

import { Container, Spinner } from "react-bootstrap";

export default function QualifyingResultsContainer({round}){
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/" + round + "/qualifiyng.json");
            const data = await response.json();
            setResults(data.MRData.RaceTable.Races[0].QualifyingResults);
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
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Qualifying Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <QualifyingResultsHeaderContainer />
                </Container>
            </Container>
        );
    }
}