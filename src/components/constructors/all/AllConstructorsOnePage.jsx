import React, { useEffect, useState } from "react";

import { Container, Spinner, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import AllConstructorsOneDetailsContainer from "./AllConstructorsOneDetailsContainer";
import AllConstructorsTitleListHeader from "./AllConstructorsTitleListHeader";
import AllConstructorsTitleListContent from "./AllConstructorsTitleListContent";
import AllConstructorsOneDriverContainer from "./AllConstructorsOneDriverContainer";

export default function AllConstructorsOnePage(){
    let { constructorId } = useParams();

    const [constructor, setConstructors] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [titles, setTitles] = useState();
    const [constructorStandingsFirst, setConstructorStandingsFirst] = useState([]);
    const [wins, setWins] = useState();
    const [seconds, setSeconds] = useState();
    const [thirds, setThirds] = useState();
    const [driverTitles, setDriverTitles] = useState([]);
    const [firstRace, setFirstRace] = useState([]);
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
            const cachedData = localStorage.getItem('allConstructor' + constructorId);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching constructor data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { constructor, drivers, seasons, titles, constructorStandingsFirst, wins, seconds, thirds, driverTitles, firstRace, nextMonday } = JSON.parse(cachedData);
                //console.log('Found cached data:', constructor);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setConstructors(constructor);
                    setDrivers(drivers);
                    setSeasons(seasons);
                    setTitles(titles);
                    setConstructorStandingsFirst(constructorStandingsFirst);
                    setWins(wins);
                    setSeconds(seconds);
                    setThirds(thirds);
                    setDriverTitles(driverTitles);
                    setFirstRace(firstRace);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('allConstructor' + constructorId);
                }
            }
            //console.log('Fetching data from API...');
            // On fait une requête vers l'API ainsi que la sauvegarde dans le cache
            const responseConstructor = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + ".json");
            const responseDrivers = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/drivers.json?limit=200");
            const responseSeasons = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/seasons.json?limit=100");
            const responseConstructorStandingsFirst = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/constructorStandings/1.json");
            const responseWins = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/results/1.json?limit=400");
            const responseSeconds = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/results/2.json?limit=400");
            const responseThirds = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/results/3.json?limit=400");
            const responseDriverTitles = await fetch("https://ergast.com/api/f1/driverStandings/1.json?limit=100");
            const responseFirstRace = await fetch("https://ergast.com/api/f1/constructors/" + constructorId + "/races.json?limit=1");
            
            const dataConstructor = await responseConstructor.json();
            const dataDrivers = await responseDrivers.json();
            const dataSeasons = await responseSeasons.json();
            const dataConstructorStandingsFirst = await responseConstructorStandingsFirst.json();
            const dataWins = await responseWins.json();
            const dataSeconds = await responseSeconds.json();
            const dataThirds = await responseThirds.json();
            const dataDriverTitles = await responseDriverTitles.json();
            const dataFirstRace = await responseFirstRace.json();
            
            const constructor = dataConstructor.MRData.ConstructorTable.Constructors[0];
            const drivers = dataDrivers.MRData.DriverTable.Drivers;
            const seasons = dataSeasons.MRData.SeasonTable.Seasons;
            const titles = dataConstructorStandingsFirst.MRData.total;
            const constructorStandingsFirst = dataConstructorStandingsFirst.MRData.StandingsTable.StandingsLists;
            const wins = dataWins.MRData.total;
            const seconds = dataSeconds.MRData.total;
            const thirds = dataThirds.MRData.total;
            const driverTitles = dataDriverTitles.MRData.StandingsTable.StandingsLists;
            const firstRace = dataFirstRace.MRData.RaceTable.Races[0];

            setConstructors(constructor);
            setDrivers(drivers);
            setSeasons(seasons);
            setTitles(titles);
            setConstructorStandingsFirst(constructorStandingsFirst);
            setWins(wins);
            setSeconds(seconds);
            setThirds(thirds);
            setDriverTitles(driverTitles);
            setFirstRace(firstRace);

            localStorage.setItem('allConstructor' + constructorId, JSON.stringify({ constructor, drivers, seasons, titles, constructorStandingsFirst, wins, seconds, thirds, driverTitles, firstRace, nextMonday: getNextMonday() }));
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

    const getDriversTitles = () => {
        let nbDriversTitles = 0;
        for(const title of driverTitles){
            if(title?.DriverStandings[0]?.Constructors.length > 1){
                for(let index = 0; index < title?.DriverStandings[0]?.Constructors.length; index++){
                    const constructor = title?.DriverStandings[0]?.Constructors[index]?.constructorId;
                    if(constructor === constructorId){
                        nbDriversTitles++;
                    }
                }
            }
            else{
                const constructor = title?.DriverStandings[0]?.Constructors[0]?.constructorId;
                if(constructor === constructorId){
                    nbDriversTitles++;
                }
            }
        }
        return nbDriversTitles;
    }

    const driverChampions = {};

    for(const title of driverTitles){
        if(title?.DriverStandings[0]?.Constructors.length > 1){
            for(let index = 0; index < title?.DriverStandings[0]?.Constructors.length; index++){
                if(title?.DriverStandings[0]?.Constructors[index]?.constructorId === constructorId){
                    const driver = title?.DriverStandings[0]?.Driver?.givenName + " " + title?.DriverStandings[0]?.Driver?.familyName;
                    const driverId = title?.DriverStandings[0]?.Driver?.driverId;
                    const season = title?.season;
                    if(driverChampions[driver]){
                        driverChampions[driver].seasons.push(season);
                    }
                    else{
                        const nationality = title?.DriverStandings[0]?.Driver?.nationality;
                        driverChampions[driver] = {
                            driverId: driverId,
                            nationality: nationality,
                            seasons: [season]
                        };
                    }
                }
            }
        }
        else{
            if(title.DriverStandings[0]?.Constructors[0]?.constructorId === constructorId){
                const driver = title?.DriverStandings[0]?.Driver?.givenName + " " + title?.DriverStandings[0]?.Driver?.familyName;
                const driverId = title?.DriverStandings[0]?.Driver?.driverId;
                const season = title?.season;
                if(driverChampions[driver]){
                    driverChampions[driver].seasons.push(season);
                }
                else{
                    const nationality = title?.DriverStandings[0]?.Driver?.nationality;
                    driverChampions[driver] = {
                        driverId: driverId,
                        nationality: nationality,
                        seasons: [season]
                    };
                }
            }
        }
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

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
                <h1 className="fst-italic mt-1" style={textBold}>{constructor?.name}</h1>
                <AllConstructorsOneDetailsContainer 
                    nationality={constructor?.nationality}
                    nbDrivers={drivers.length}
                    nbSeasons={seasons.length}
                    titles={titles}
                    wins={wins}
                    podiums={parseInt(wins)+parseInt(seconds)+parseInt(thirds)}
                    driverTitles={getDriversTitles()}
                    firstRace={firstRace?.season + " " + firstRace?.raceName}
                />
                {
                    Object.keys(driverChampions).length > 0 ? (
                        <>
                            <h1 className="fst-italic mt-3" style={textRegular}>
                                DRIVERS TITLES
                            </h1>
                            <Container className="d-flex flex-column justify-content-center mb-2 pt-3 pb-3 ps-1 pe-1 rounded" style={{backgroundColor: "#38383f"}}>
                                <Row className="d-flex justify-content-around">
                                    {
                                        Object.keys(driverChampions).map((driver, index) => {
                                            return (
                                                <AllConstructorsOneDriverContainer
                                                    key={index}
                                                    driver={driver}
                                                    driverId={driverChampions[driver].driverId}
                                                    nationality={driverChampions[driver].nationality}
                                                    seasons={driverChampions[driver].seasons}
                                                />
                                            )
                                        })
                                    }
                                </Row>
                            </Container>
                        </>
                    ) : ("")
                }
                {
                    titles > 0 ? (
                        <>
                            <h1 className="fst-italic mt-3" style={textRegular}>
                                CONSTRUCTOR TITLES
                            </h1>
                            <Container className="d-flex flex-column justify-content-center mb-2 pt-3 pb-3 ps-1 pe-1 rounded" style={{backgroundColor: "#38383f"}}>
                                <AllConstructorsTitleListHeader />
                                {
                                    constructorStandingsFirst.map((season, index) => {
                                        return (
                                            <AllConstructorsTitleListContent
                                                key={index}
                                                season={season?.season}
                                                points={season?.ConstructorStandings[0]?.points}
                                                wins={season?.ConstructorStandings[0]?.wins}
                                            />
                                        )
                                    })
                                }
                            </Container>
                        </>
                    ) : ("")
                }
            </Container>
        )
    }
}