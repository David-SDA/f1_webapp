import React, { useEffect, useState } from "react";

import SmallDriverContainer from "./SmallDriverContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function TopThreeDriversContainer(){
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedTopThreeDrivers = localStorage.getItem('topThreeDrivers');
            // On récupère la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching top 3 drivers data...');

            // Si les données sont en cache
            if(cachedTopThreeDrivers){
                // On extrait les données du cache
                const { topThreeDrivers, timestamp } = JSON.parse(cachedTopThreeDrivers);
                // On extrait la date du lendemain
                const oneDayFromNow = timestamp + 24 * 60 * 60 * 1000;
                //console.log('Found cached data:', topThreeDrivers);

                // Si la date actuelle est avant la date du lendemain, on utilise les données du cache
                if(currentDateTime < oneDayFromNow){
                    //console.log('Using cached data...');
                    setStandings(topThreeDrivers);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('topThreeDrivers');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json?limit=3');
            const data = await response.json();
            const topThreeDrivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setStandings(topThreeDrivers);
            localStorage.setItem('topThreeDrivers', JSON.stringify({ topThreeDrivers, timestamp: new Date().getTime() }));
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
                    standings.map((driver, index) => {
                        return (
                            <SmallDriverContainer
                                position={driver?.position}
                                firstName={driver?.Driver?.givenName}
                                name={driver?.Driver?.familyName}
                                points={driver?.points}
                                color={currentConstructorColor[driver?.Constructors[0]?.constructorId]}
                                driverId={driver?.Driver?.driverId}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}