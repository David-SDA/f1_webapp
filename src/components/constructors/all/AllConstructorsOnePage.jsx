import React, { useEffect, useState } from "react";

import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllConstructorsOneDetailsContainer from "./AllConstructorsOneDetailsContainer";
import AllConstructorsTitleListHeader from "./AllConstructorsTitleListHeader";
import AllConstructorsTitleListContent from "./AllConstructorsTitleListContent";

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

    const fetchInfo = async () => {
        try{
            const responseConstructor = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + ".json");
            const responseDrivers = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/drivers.json?limit=200");
            const responseSeasons = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/seasons.json?limit=100");
            const responseConstructorStandingsFirst = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/constructorStandings/1.json");
            const responseWins = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/results/1.json?limit=400");
            const responseSeconds = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/results/2.json?limit=400");
            const responseThirds = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/results/3.json?limit=400");
            const responseDriverTitles = await fetch("http://ergast.com/api/f1/driverStandings/1.json?limit=100");
            const responseFirstRace = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/races.json?limit=1");
            
            const dataConstructor = await responseConstructor.json();
            const dataDrivers = await responseDrivers.json();
            const dataSeasons = await responseSeasons.json();
            const dataConstructorStandingsFirst = await responseConstructorStandingsFirst.json();
            const dataWins = await responseWins.json();
            const dataSeconds = await responseSeconds.json();
            const dataThirds = await responseThirds.json();
            const dataDriverTitles = await responseDriverTitles.json();
            const dataFirstRace = await responseFirstRace.json();
            
            setConstructors(dataConstructor.MRData.ConstructorTable.Constructors[0]);
            setDrivers(dataDrivers.MRData.DriverTable.Drivers);
            setSeasons(dataSeasons.MRData.SeasonTable.Seasons);
            setTitles(dataConstructorStandingsFirst.MRData.total);
            setConstructorStandingsFirst(dataConstructorStandingsFirst.MRData.StandingsTable.StandingsLists);
            setWins(dataWins.MRData.total);
            setSeconds(dataSeconds.MRData.total);
            setThirds(dataThirds.MRData.total);
            setDriverTitles(dataDriverTitles.MRData.StandingsTable.StandingsLists);
            setFirstRace(dataFirstRace.MRData.RaceTable.Races[0]);
        }catch(error){
            console.log(error);
        }finally{
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

    const driverChampions = []

    for(const title of driverTitles){
        if(title?.DriverStandings[0]?.Constructors.length > 1){
            for(let index = 0; index < title?.DriverStandings[0]?.Constructors.length; index++){
                if(title?.DriverStandings[0]?.Constructors[index]?.constructorId === constructorId){
                    const championsDetails = {
                        driverName : title?.DriverStandings[0]?.Driver?.givenName + " " + title?.DriverStandings[0]?.Driver?.familyName,
                        season: title?.season,
                        points : title?.DriverStandings[0]?.points,
                        wins: title?.DriverStandings[0]?.wins
                    };
                    driverChampions.push(championsDetails);
                }
            }
        }
        else{
            if(title.DriverStandings[0]?.Constructors[0]?.constructorId === constructorId){
                const championsDetails = {
                    driverName : title.DriverStandings[0]?.Driver?.givenName + " " + title?.DriverStandings[0]?.Driver?.familyName,
                    season: title.season,
                    points : title.DriverStandings[0]?.points,
                    wins: title.DriverStandings[0]?.wins
                };
                driverChampions.push(championsDetails);
            }
        }
    }
    console.log(driverChampions);
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
                    titles > 0 ? (
                        <>
                            <h1 className="fst-italic mt-3" style={textRegular}>
                                DRIVERS TITLES
                            </h1>
                            <Container className="d-flex flex-column justify-content-center mb-2 pt-3 pb-3 ps-1 pe-1 rounded" style={{backgroundColor: "#38383f"}}>
                            
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