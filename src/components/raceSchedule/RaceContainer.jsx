import React, { useEffect, useState } from "react";

import RaceHeaderContainer from './RaceHeaderContainer';
import ScheduleNormalWeekendContainer from './ScheduleNormalWeekendContainer';
import ScheduleSprintWeekendContainer from './ScheduleSprintWeekendContainer';

import { Container, Spinner } from "react-bootstrap";

export default function RaceContainer({round, reset}){
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedRace = localStorage.getItem('race-' + round);
            // On récupère la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching race data...');

            // Si les données sont en cache
            if(cachedRace){
                // On extrait les données du cache
                const { raceData } = JSON.parse(cachedRace);
                // On extrait la date de la course
                const raceDateTime = new Date(raceData.date + 'T' + raceData.time).getTime();
                //console.log('Found cached data:', raceData);

                // Si la date actuelle est avant la date de la course + 5 heures, on utilise les données du cache
                if(currentDateTime < raceDateTime + 5 * 60 * 60 * 1000 && reset){
                    //console.log('Using cached data... with reset after');
                    setRace(raceData);
                    setIsLoading(false);
                    return;
                }
                else if(!reset){
                    //console.log('Using cached data... because not reset');
                    setRace(raceData);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('race-' + round);
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch('https://ergast.com/api/f1/current/' + round + '.json');
            const data = await response.json();
            const raceData = data.MRData.RaceTable.Races[0];
            setRace(raceData);
            localStorage.setItem('race-' + round, JSON.stringify({ raceData }));
        }
        catch(error){
            console.log('Error fetching race data:', error);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [round]);

    let dateFP1 = new Date(race?.FirstPractice?.date + 'T' + race?.FirstPractice?.time);
    let dateFP2 = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
    let dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    let dateRace = new Date(race?.date + 'T' + race?.time);

    if(race?.ThirdPractice){
        var dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    }
    else{
        var dateSprint = new Date(race?.Sprint?.date + 'T' + race?.Sprint?.time);
    }

    if(isLoading){
        return (
            <Spinner animation="border" style={{color: "#ff1801"}} />
        )
    }else{
        return (
            <Container className="d-flex flex-column shadow-lg rounded-4 p-2 mb-5" style={{backgroundColor: '#f8f8f8'}}>
                <RaceHeaderContainer
                    round={race?.round}
                    raceName={race?.raceName}
                    country={race?.Circuit?.Location?.country}
                />
                {
                    (dateFP3) ? 
                        <ScheduleNormalWeekendContainer
                            dateFP1={dateFP1}
                            dateFP2={dateFP2}
                            dateFP3={dateFP3}
                            dateQuali={dateQuali}
                            dateRace={dateRace} 
                        />
                    :
                        <ScheduleSprintWeekendContainer
                            dateFP1={dateFP1}
                            dateQuali={dateQuali}
                            dateFP2={dateFP2}
                            dateSprint={dateSprint}
                            dateRace={dateRace}
                        />
                }
            </Container>
        );
    }
}