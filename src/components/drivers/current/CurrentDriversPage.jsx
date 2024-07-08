import React, { useEffect, useState } from "react";

import CurrentDriversCardContainer from "./CurrentDriversCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";

export default function CurrentDriversPage(){
    const [drivers, setDrivers] = useState([]);
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
            const cachedDrivers = localStorage.getItem('current_drivers');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching current drivers data...');

            // Si les données sont en cache
            if(cachedDrivers){
                // On extrait les données du cache
                const { currentDrivers, nextMonday } = JSON.parse(cachedDrivers);
                // On obtient le prochain lundi
                //console.log('Found cached data:', currentDrivers);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setDrivers(currentDrivers);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('current_drivers');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("https://ergast.com/api/f1/current/drivers.json");
            const data = await response.json();
            const currentDrivers = data.MRData.DriverTable.Drivers;
            setDrivers(currentDrivers);
            localStorage.setItem('current_drivers', JSON.stringify({ currentDrivers, nextMonday: getNextMonday() }));
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
    }, [])

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2024 : Drivers</h1>
                <Row>
                    {
                        drivers.map((driver, index) => {
                            return (
                                <CurrentDriversCardContainer
                                    key={index}
                                    driverId={driver?.driverId}
                                    nationality={driver?.nationality}
                                    givenName={driver?.givenName}
                                    familyName={driver?.familyName}
                                    permanentNumber={driver?.permanentNumber}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}