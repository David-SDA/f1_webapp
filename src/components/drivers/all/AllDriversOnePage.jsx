import React, { useEffect, useState } from "react";

import AllDriversOneDetailsContainer from "./AllDriversOneDetailsContainer";

import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllDriversOneTeamContainer from "./AllDriversOneTeamsContainer";

export default function AllDriversOnePage(){
    let { driverId } = useParams();

    const [driver, setDriver] = useState([]);
    const [results, setResults] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + ".json");
            const response2 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/driverStandings.json");
            const response3 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/results.json?limit=500");
            const response4 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/constructors.json");

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();

            setDriver(data1.MRData.DriverTable.Drivers[0]);
            setDriverStandings(data2.MRData.StandingsTable.StandingsLists);
            setResults(data3.MRData.RaceTable.Races);
            setTeams(data4.MRData.ConstructorTable.Constructors);
        }catch(error){
            console.log(error);
        }finally{
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

    const seasonsByTeams = {};
    for(const driverStanding of driverStandings){
        const season = driverStanding?.season;
        const team = driverStanding?.DriverStandings[0]?.Constructors[0]?.name;

        if(!seasonsByTeams[team]){
            seasonsByTeams[team] = [];
        }

        seasonsByTeams[team].push(season);
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

    const textBlack = {
        fontFamily: "Formula1-Black",
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
                <Container className="mb-2 pt-3 pb-3 ps-1 pe-1 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="bg-white mt-sm-0 ms-1 me-1 p-1 rounded">
                        <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>ROUND</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>R</p>
                        </Col>
                        <Col xs={2} sm={3} md={2} lg={2} className="ps-0 ps-sm-2 pe-0 pe-sm-2">
                            <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>SEASON</p>
                            <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>2023</p>
                        </Col>
                        <Col xs={8} sm={7} md={7} lg={6}>
                            <p className="mb-0 text-center" style={textBlack}>RACE</p>
                        </Col>
                        <Col md={1} lg={1} className="d-none d-md-block p-0">
                            <p className="mb-0 text-center" style={textBlack}>GRID</p>
                        </Col>
                        <Col xs={2} sm={1} md={1} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                            <p className="d-none d-sm-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>
                            <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>P</p>
                        </Col>
                    </Row>
                    {
                        [...results].reverse().map((result, index) => {
                            return (
                                <Row className="bg-white mt-2 ms-1 me-1 p-1 rounded" key={index}>
                                    <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                                        <p className="mb-0 text-center" style={textBlack}>{result?.round}</p>
                                    </Col>
                                    <Col xs={2} sm={3} md={2} lg={2} className="d-flex justify-content-center align-items-center ps-0 ps-sm-2 pe-0 pe-sm-2">
                                        <p className="mb-0 text-center" style={textRegular}>{result?.season}</p>
                                    </Col>
                                    <Col xs={8} sm={7} md={7} lg={6} className="d-flex justify-content-center align-items-center">
                                        <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                                            <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{result?.raceName}</p>
                                            <p className="d-none d-sm-flex align-items-center mb-0 text-center" style={textBold}>{result?.raceName}</p>
                                        </a>
                                    </Col>
                                    <Col md={1} lg={1} className="d-none d-md-block p-0">
                                        <p className="mb-0 text-center" style={textBlack}>{result?.Results[0]?.grid}</p>
                                    </Col>
                                    <Col xs={2} sm={1} md={1} lg={2} className="d-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textBlack}>{result?.Results[0]?.positionText}</p>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}