import React, { useEffect, useState } from "react";

import SmallRoundFlagContainer from "./SmallRoundFlagContainer";
import DatesContainer from "./DatesContainer";
import TopThreeDriversRaceContainer from "./TopThreeDriversRaceContainer";
import TrackImageContainer from "./TrackImageContainer";

import { Col, Container, Row, Spinner } from "react-bootstrap";

export default function SchedulePageContainer() {
    const myBorder = {
        fontFamily: "Formula1-Regular",
        borderBottom: "5px solid #ff1801",
        borderRight: "5px solid #ff1801",
        borderRadius: 10,
        minHeight: 200,
    };

    const [schedule, setSchedule] = useState([]); // Le programme complet
    const [winners, setWinners] = useState([]); // Les vainqueurs des courses déjà couru
    const [seconds, setSeconds] = useState([]); // Les deuxièmes des courses déjà couru
    const [thirds, setThirds] = useState([]); // Les troisièmes des courses déjà couru
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
            const cachedData = localStorage.getItem('nowSchedule');            
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching schedule data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { schedule, winners, seconds, thirds, nextMonday } = JSON.parse(cachedData);
                //console.log('Found cached data:', schedule);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setSchedule(schedule);
                    setWinners(winners);
                    setSeconds(seconds);
                    setThirds(thirds);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('nowSchedule');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const responseSchedule = await fetch("https://ergast.com/api/f1/current.json");
            const responseWinners = await fetch("https://ergast.com/api/f1/current/results/1.json");
            const responseSeconds = await fetch("https://ergast.com/api/f1/current/results/2.json");
            const responseThirds = await fetch("https://ergast.com/api/f1/current/results/3.json");

            const dataSchedule = await responseSchedule.json();
            const dataWinners = await responseWinners.json();
            const dataSeconds = await responseSeconds.json();
            const dataThirds = await responseThirds.json();

            const schedule = dataSchedule.MRData.RaceTable.Races;
            const winners = dataWinners.MRData.RaceTable.Races;
            const seconds = dataSeconds.MRData.RaceTable.Races;
            const thirds = dataThirds.MRData.RaceTable.Races;

            setSchedule(schedule);
            setWinners(winners);
            setSeconds(seconds);
            setThirds(thirds);

            localStorage.setItem('nowSchedule', JSON.stringify({ schedule, winners, seconds, thirds, nextMonday: getNextMonday() }));
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
            <Container className="mt-2">
                <h2 className="mb-4 p-3 fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2024 Schedule</h2>
                <Row className="d-flex flex-wrap">
                    {
                        schedule.map((race, index) => {
                            const dateDebut = new Date(race?.FirstPractice?.date);
                            const dateFin = new Date(race?.date);
                            
                            return (
                                <Col sm={12} md={6} lg={4} className="mb-3" key={index}>
                                    <Container style={myBorder} >
                                        <a href={"/schedule/" + race?.round} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                                            <SmallRoundFlagContainer round={race?.round} country={race?.Circuit?.Location?.country} />
                                            <DatesContainer dateDebut={dateDebut} dateFin={dateFin} />
                                            <p className="text-center mt-2" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.0001rem"}}>{race?.raceName} &gt;</p>
                                        </a>
                                        {
                                            winners[index] && seconds[index] && thirds[index] ? (
                                                <TopThreeDriversRaceContainer winner={winners[index]} second={seconds[index]} third={thirds[index]} />
                                            ) : (
                                                <TrackImageContainer heightSize={170} circuitId={race?.Circuit?.circuitId} country={race?.Circuit?.Location?.country} />
                                            )
                                        }
                                    </Container>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
