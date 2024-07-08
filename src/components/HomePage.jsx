import React, { useEffect, useState } from "react";

import RaceContainer from "./raceSchedule/RaceContainer";
import SmallStandingsContainer from "./standings/SmallStandingsContainer";

import { Container, Spinner } from "react-bootstrap";

export default function HomePage(){
    const [race, setRace] = useState([]);
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
            const cachedRace = localStorage.getItem('nextRace');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching race data...');

            // Si les données sont en cache
            if(cachedRace){
                // On extrait les données du cache
                const { race, nextMonday } = JSON.parse(cachedRace);
                //console.log('Found cached data:', race);

                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setRace(race);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('nextRace');
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel à l'API ainsi que la sauvegarde dans le cache

            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable.Races[0]);

            localStorage.setItem('nextRace', JSON.stringify({race: data.MRData.RaceTable.Races[0], nextMonday: getNextMonday()}));
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
            <Spinner animation="border" style={{color: "#ff1801"}} />
        )
    }
    else{
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <p className="h1 align-self-start fst-italic ms-3 mt-2" style={{fontFamily: "Formula1-Regular"}}>Current Standings</p>
                <SmallStandingsContainer />
                <p className="h1 align-self-start fst-italic ms-3" style={{fontFamily: "Formula1-Regular"}}>Next Race</p>
                <RaceContainer race={race} />
            </Container>
        );
    }
}