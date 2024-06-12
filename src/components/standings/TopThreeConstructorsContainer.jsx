import React, { useEffect, useState } from "react";

import SmallConstructorContainer from "./SmallConstructorContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function TopThreeConstructorsContainer(){
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedTopThreeConstructors = localStorage.getItem('topThreeConstructors');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching top 3 constructors data...');

            // Si les données sont en cache
            if(cachedTopThreeConstructors){
                // On extrait les données du cache
                const { topThreeConstructors, timestamp } = JSON.parse(cachedTopThreeConstructors);
                // On extrait la date du lendemain
                const oneDayFromNow = timestamp + 24 * 60 * 60 * 1000;
                //console.log('Found cached data:', topThreeConstructors);

                // Si la date actuelle est avant la date du lendemain, on utilise les données du cache
                if(currentDateTime < oneDayFromNow){
                    //console.log('Using cached data...');
                    setStandings(topThreeConstructors);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('topThreeConstructors');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json?limit=3');
            const data = await response.json();
            const topThreeConstructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            setStandings(topThreeConstructors);
            localStorage.setItem('topThreeConstructors', JSON.stringify({ topThreeConstructors, timestamp: new Date().getTime() }));
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                {
                    standings.map((constructor, index) => {
                        return (
                            <SmallConstructorContainer
                                position={constructor?.position}
                                name={currentConstructorSmallText[constructor?.Constructor?.constructorId]}
                                points={constructor?.points}
                                color={currentConstructorColor[constructor?.Constructor?.constructorId]}
                                constructorId={constructor?.Constructor?.constructorId}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}