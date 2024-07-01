import React, { useEffect, useState } from "react";

import RaceSprintResultsHeaderContainer from "./RaceSprintResultsHeaderContainer";
import RaceSprintResultsContentContainer from "./RaceSprintResultsContentContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function RaceResultsContainer({round}){
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
            const cachedData = localStorage.getItem('nowResults_' + round);
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
                    localStorage.removeItem('nowResults_' + round);
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel à l'API ainsi que la ssauvegarde dans le cache
            const response = await fetch("http://ergast.com/api/f1/current/" + round + "/results.json");
            const data = await response.json();
            const results = data.MRData.RaceTable.Races[0].Results;
            setResults(results);
            localStorage.setItem('nowResults_' + round, JSON.stringify({ results, nextMonday: getNextMonday() }));
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
            <Container className="p-0">
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <RaceSprintResultsHeaderContainer type={"Race"} />
                    {
                        results.map((result, index) => {
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
}