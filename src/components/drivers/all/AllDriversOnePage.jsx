import React, { useEffect, useState } from "react";

import AllDriversOneDetailsContainer from "./AllDriversOneDetailsContainer";
import AllDriversOneTeamContainer from "./AllDriversOneTeamsContainer";
import AllDriversOneRacesHeaderContainer from "./AllDriversOneRacesHeaderContainer";

import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllDriversOneRacesContentContainer from "./AllDriversOneRacesContentContainer";

export default function AllDriversOnePage(){
    let { driverId } = useParams();

    const [driver, setDriver] = useState([]);
    const [results, setResults] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllRaces, setShowAllRaces] = useState(false);

    // Fonction pour connaitre le prochain lundi
    const getNextMonday = () => {
        const d = new Date();
        d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    };

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedData = localStorage.getItem('allDriver' + driverId);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching driver data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { driver, driverStandings, results, teams } = JSON.parse(cachedData);
                const nextMonday = getNextMonday();
                //console.log('Found cached data:', driver);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setDriver(driver);
                    setDriverStandings(driverStandings);
                    setResults(results);
                    setTeams(teams);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('allDriver' + driverId);
                }
            }
            //console.log('Fetching data from API...');
            // On fait les requêtes vers l'API ainsi que la sauvegarde dans le cache
            const response1 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + ".json");
            const response2 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/driverStandings.json");
            const response3 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/results.json?limit=500");
            const response4 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/constructors.json");

            const dataDriver = await response1.json();
            const dataStandings = await response2.json();
            const dataResults = await response3.json();
            const dataConstructors = await response4.json();

            const driver = dataDriver.MRData.DriverTable.Drivers[0];
            const driverStandings = dataStandings.MRData.StandingsTable.StandingsLists;
            const results = dataResults.MRData.RaceTable.Races;
            const teams = dataConstructors.MRData.ConstructorTable.Constructors;

            setDriver(driver);
            setDriverStandings(driverStandings);
            setResults(results);
            setTeams(teams);

            localStorage.setItem('allDriver' + driverId, JSON.stringify({ driver, driverStandings, results, teams }));
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

    // Calcul du nombre de podiums
    const getPodiums = () => {
        let podiums = 0;
        for(const result of results){
            const position = result?.Results[0]?.position;
            if(["1", "2", "3"].includes(position)){
                podiums++;
            }
        }
        return podiums;
    }

    // Calcul du nombre de victoires
    const getWins = () => {
        let wins = 0;
        for(const result of results){
            const position = result?.Results[0]?.position;
            if(position === "1"){
                wins++;
            }
        }
        return wins;
    }

    // Calcul du nombre de championnat gagné
    const getChampionships = () => {
        let championships = 0;
        for(const driverStanding of driverStandings){
            const position = driverStanding?.DriverStandings[0]?.position;
            if(position === "1"){
                championships++;
            }
        }
        return championships;
    }

    // Avoir les années pour lequelles un pilote a couru
    const seasonsByTeams = {};
    for(const driverStanding of driverStandings){
        const season = driverStanding?.season;
        const team = driverStanding?.DriverStandings[0]?.Constructors[0]?.name;

        if(!seasonsByTeams[team]){
            seasonsByTeams[team] = [];
        }

        seasonsByTeams[team].push(season);
    }

    // Gérer le fait d'afficher plus ou moins de courses
    const handleDisplayMoreRaces = () => {
        setShowAllRaces(!showAllRaces);
    }

    let nbPodiums = getPodiums();
    let nbWins = getWins();
    let nbChampionships = getChampionships();

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
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
                <h1 className="fst-italic mt-1" style={textRegular}>
                    <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                </h1>
                <AllDriversOneDetailsContainer
                    nationality={driver?.nationality}
                    dateOfBirth={driver?.dateOfBirth}
                    firstSeason={results[0]?.season}
                    firstRace={results[0]?.raceName}
                    nbSeasons={driverStandings.length}
                    nbRaces={results.length}
                    nbChampionships={nbChampionships}
                    nbWins={nbWins}
                    nbPodiums={nbPodiums}
                    nbTeams={teams.length}
                />
                <h1 className="fst-italic mt-1" style={textRegular}>
                    TEAMS
                </h1>
                <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="d-flex justify-content-around">
                        {
                            teams.map((team, index) => {
                                return (
                                    <AllDriversOneTeamContainer
                                        key={index}
                                        name={team?.name}
                                        constructorId={team?.constructorId}
                                        nationality={team?.nationality}
                                        driverStandings={driverStandings}
                                    />
                                );
                            })
                        }
                    </Row>
                </Container>
                <h1 className="fst-italic mt-1" style={textRegular}>
                    RACES
                </h1>
                <Container className="d-flex flex-column justify-content-center mb-2 pt-3 pb-3 ps-1 pe-1 rounded" style={{backgroundColor: "#38383f"}}>
                    <AllDriversOneRacesHeaderContainer />
                    {
                        results.slice().reverse().slice(0, showAllRaces ? results.length : 5).map((result, index) => {
                            return (
                                <AllDriversOneRacesContentContainer
                                    key={index}
                                    round={result?.round}
                                    season={result?.season}
                                    raceName={result?.raceName}
                                    grid={result?.Results[0]?.grid}
                                    position={result?.Results[0]?.positionText}
                                />
                            );
                        })
                    }
                    {
                        results.length > 5 ? (
                            <Button variant="outline-light" size="sm" className="align-self-center mt-3" onClick={handleDisplayMoreRaces}>
                                {showAllRaces ? "Show less" : "Show More"}
                            </Button>
                        ) : ("")
                    }
                </Container>
            </Container>
        );
    }
}