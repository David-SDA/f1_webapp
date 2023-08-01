import React, { useEffect, useState } from "react";

import CurrentDriversDetailsContainer from "./CurrentDriversDetailsContainer";
import CurrentDriversThisSeasonStatsContainer from "./CurrentDriversThisSeasonStatsContainer";
import CurrentDriversThisSeasonRacesSprintHeaderContainer from "./thisSeasonRacesSprint/CurrentDriversThisSeasonRacesSprintHeaderContainer";
import CurrentDriversThisSeasonRacesSprintContentContainer from "./thisSeasonRacesSprint/CurrentDriversThisSeasonRacesSprintContentContainer";
import CurrentDriversThisSeasonQualifyingHeaderContainer from "./thisSeasonQualifying/CurrentDriversThisSeasonQualifyingHeaderContainer";
import CurrentDriversThisSeasonQualifyingContentContainer from "./thisSeasonQualifying/CurrentDriversThisSeasonQualifyingContentContainer";
import { currentDrivers } from "../../../constants/currentDrivers";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    const [standing, setStanding] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [driverQualifyings, setDriverQualifyings] = useState([]);
    const [driverSprints, setDriverSprints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/driverStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/results.json");
            const response3 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/qualifying.json")
            const response4 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/sprint.json")

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDriverResults(data2.MRData.RaceTable.Races);
            setDriverQualifyings(data3.MRData.RaceTable.Races);
            setDriverSprints(data4.MRData.RaceTable.Races);
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
        for(const driverResult of driverResults){
            const position = driverResult?.Results[0]?.position;
            if(["1", "2", "3"].includes(position)){
                podiums++;
            }
        }
        return podiums;
    }

    let nbPodiums = getPodiums();

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
        const dateOfBirth = new Date(standing?.DriverStandings[0]?.Driver?.dateOfBirth);

        return (
            <Container>
                <h1 className="fst-italic mt-1">
                    <span style={textRegular}>{standing?.DriverStandings[0]?.Driver?.givenName}</span> <span style={textBold}>{standing?.DriverStandings[0]?.Driver?.familyName}</span>
                </h1>
                <CurrentDriversDetailsContainer
                    image={currentDrivers[driverId]}
                    flagNationality={flagsNationality[standing?.DriverStandings[0]?.Driver?.nationality]}
                    nationality={standing?.DriverStandings[0]?.Driver?.nationality}
                    dateOfBirth={dateOfBirth}
                    permanentNumber={standing?.DriverStandings[0]?.Driver?.permanentNumber}
                    team={currentConstructorSmallText[standing?.DriverStandings[0]?.Constructors[0]?.constructorId]}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>THIS SEASON, AFTER ROUND {standing?.round}</h2>
                <CurrentDriversThisSeasonStatsContainer
                    position={standing?.DriverStandings[0]?.positionText}
                    points={standing?.DriverStandings[0]?.points}
                    wins={standing?.DriverStandings[0]?.wins}
                    nbPodiums={nbPodiums}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>RACES</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <CurrentDriversThisSeasonRacesSprintHeaderContainer />
                    {
                        [...driverResults].reverse().map((driverResult, index) => {
                            return (
                                <CurrentDriversThisSeasonRacesSprintContentContainer
                                    key={index}
                                    round={driverResult?.round}
                                    raceName={driverResult?.raceName}
                                    grid={driverResult?.Results[0]?.grid}
                                    position={driverResult?.Results[0]?.positionText}
                                    time={driverResult?.Results[0]?.Time?.time}
                                    status={driverResult?.Results[0]?.status}
                                    points={driverResult?.Results[0]?.points}
                                />
                            );
                        })
                    }
                </Container>
                <h2 className="fst-italic mt-2" style={textRegular}>QUALIFYING</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <CurrentDriversThisSeasonQualifyingHeaderContainer />
                    {
                        [...driverQualifyings].reverse().map((driverQualifying, index) => {
                            return (
                                <CurrentDriversThisSeasonQualifyingContentContainer
                                    key={index}
                                    round={driverQualifying?.round}
                                    raceName={driverQualifying?.raceName}
                                    position={driverQualifying?.QualifyingResults[0]?.position}
                                    q1={driverQualifying?.QualifyingResults[0]?.Q1}
                                    q2={driverQualifying?.QualifyingResults[0]?.Q2}
                                    q3={driverQualifying?.QualifyingResults[0]?.Q3}
                                />
                            );
                        })
                    }
                </Container>
                <h2 className="fst-italic mt-2" style={textRegular}>SPRINTS</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <CurrentDriversThisSeasonRacesSprintHeaderContainer />
                    {
                        [...driverSprints].reverse().map((driverSprint, index) => {
                            return (
                                <CurrentDriversThisSeasonRacesSprintContentContainer
                                    key={index}
                                    round={driverSprint?.round}
                                    raceName={driverSprint?.raceName}
                                    grid={driverSprint?.SprintResults[0]?.grid}
                                    position={driverSprint?.SprintResults[0]?.positionText}
                                    time={driverSprint?.SprintResults[0]?.Time?.time}
                                    status={driverSprint?.SprintResults[0]?.status}
                                    points={driverSprint?.SprintResults[0]?.points}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}