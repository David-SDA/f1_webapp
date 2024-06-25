import React, { useEffect, useState } from "react";

import QualifyingResultsHeaderContainer from "./QualifyingResultsHeaderContainer";
import QualifyingResultsContentContainer from "./QualifyingResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function QualifyingResultsContainer({round}){
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fonction pour connaitre le prochain lundi
    const getNextMonday = () => {
        const d = new Date();
        d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
        d.setHours(8, 0, 0, 0);
        return d.getTime();
    };

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedData = localStorage.getItem('nowQualifyingResults_' + round);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching results data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { results, nextMonday } = JSON.parse(cachedData);
                //console.log('Found cached data:', results);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setResults(results);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('nowQualifyingResults_' + round);
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel à l'API ainsi que la ssauvegarde dans le cache
            const response = await fetch("http://ergast.com/api/f1/current/" + round + "/qualifying.json");
            const data = await response.json();
            const results = data.MRData.RaceTable.Races[0].QualifyingResults;
            setResults(results);
            localStorage.setItem('nowQualifyingResults_' + round, JSON.stringify({ results, nextMonday: getNextMonday() }));
        }
        catch(error){
            console.log(error);
        }
        finally{
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
                    {
                        results.map((result, index) => {
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
}