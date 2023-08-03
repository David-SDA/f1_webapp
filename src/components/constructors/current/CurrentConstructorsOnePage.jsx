import React, { useEffect, useState } from "react";

import CurrentConstructorsDetailsContainer from "./CurrentConstructorsDetailsContainer";
import CurrentConstructorsThisSeasonStatsContainer from "./CurrentConstructorsThisSeasonStatsContainer";
import CurrentConstructorsThisSeasonRacesSprintHeaderContainer from "./thisSeasonRacesSprint/CurrentConstructorsThisSeasonRacesSprintHeaderContainer";
import CurrentConstructorsThisSeasonRacesSprintContentContainer from "./thisSeasonRacesSprint/CurrentConstructorsThisSeasonRacesSprintContentContainer";
import CurrentConstructorsThisSeasonQualifyingHeaderContainer from "./thisSeasonQualifying/CurrentConstructorsThisSeasonQualifyingHeaderContainer";
import { currentConstructorImage } from "../../../constants/currentConstructorImage";
import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CurrentConstructorsThisSeasonQualifyingContentContainer from "./thisSeasonQualifying/CurrentConstructorsThisSeasonQualifyingContentContainer";

export default function CurrentConstuctorsOnePage(){
    let { constructorId } = useParams();

    const [standing, setStanding] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [results, setResults] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [qualifyings, setQualifyings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/constructorStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/drivers.json");
            const response3 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/results.json?limit=50");
            const response4 = await fetch("http://ergast.com/api/f1/current/constructors/"+ constructorId + "/sprint.json");
            const response5 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/qualifying.json?limit=50")

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            const data5 = await response5.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDrivers(data2.MRData.DriverTable.Drivers);
            setResults(data3.MRData.RaceTable.Races);
            setSprints(data4.MRData.RaceTable.Races);
            setQualifyings(data5.MRData.RaceTable.Races);
        }catch(error){
            console.log(error);
        }finally{
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
                <h1 className="fst-italic mt-1">
                    <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                        <span style={textBold}>{standing?.ConstructorStandings[0]?.Constructor?.name}</span>
                    </a>
                </h1>
                <CurrentConstructorsDetailsContainer
                    image={currentConstructorImage[constructorId]}
                    flag={flagsNationality[standing?.ConstructorStandings[0]?.Constructor?.nationality]}
                    nationality={standing?.ConstructorStandings[0]?.Constructor?.nationality}
                    drivers={drivers}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>THIS SEASON, AFTER ROUND {standing?.round}</h2>
                <CurrentConstructorsThisSeasonStatsContainer
                    position={standing?.ConstructorStandings[0]?.positionText}
                    points={standing?.ConstructorStandings[0]?.points}
                    wins={standing?.ConstructorStandings[0]?.wins}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>RACES</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    {
                        drivers[2] ? ( // Si il y a 3 pilotes
                            <CurrentConstructorsThisSeasonRacesSprintHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                                driver3={drivers[2]?.familyName}
                                driver3Code={drivers[2]?.code}
                            />
                        ) : ( // Si il y a 2 pilotes
                            <CurrentConstructorsThisSeasonRacesSprintHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                            />
                        )
                    }
                    {
                        [...results].reverse().map((result, index) => {
                            let totalPoints = parseInt(result?.Results[0]?.points) + parseInt(result?.Results[1]?.points);
                            
                            // Si il y a 3 pilotes
                            if(drivers[2]){
                                return (
                                    <CurrentConstructorsThisSeasonRacesSprintContentContainer
                                        key={index}
                                        round={result?.round}
                                        race={result?.raceName}
                                        driver1Position=
                                            {
                                                result?.Results[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                    result?.Results[0]?.positionText : result?.Results[1]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                        result?.Results[1]?.positionText : "--"
                                            }
                                        driver2Position=
                                            {
                                                result?.Results[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                    result?.Results[1]?.positionText : result?.Results[0]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                        result?.Results[0]?.positionText : "--"
                                            }
                                        driver3Position=
                                            {
                                                result?.Results[0]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                    result?.Results[0]?.positionText : result?.Results[1]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                        result?.Results[1]?.positionText : "--"
                                            }
                                        points={totalPoints}
                                    />
                                );
                            }
                            else{ // Si il y a 2 pilotes
                                return (
                                    <CurrentConstructorsThisSeasonRacesSprintContentContainer
                                        key={index}
                                        round={result?.round}
                                        race={result?.raceName}
                                        driver1Position={result?.Results[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ? result?.Results[0]?.positionText : result?.Results[1]?.positionText}
                                        driver2Position={result?.Results[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ? result?.Results[1]?.positionText : result?.Results[0]?.positionText}
                                        points={totalPoints}
                                    />
                                )
                            }
                        })
                    }
                </Container>
                <h2 className="fst-italic mt-2" style={textRegular}>QUALIFYINGS</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    {
                        drivers[2] ? ( // Si il y a 3 pilotes
                            <CurrentConstructorsThisSeasonQualifyingHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                                driver3={drivers[2]?.familyName}
                                driver3Code={drivers[2]?.code}
                            />
                        ) : ( // Si il y a 2 pilotes
                            <CurrentConstructorsThisSeasonQualifyingHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                            />
                        )
                    }
                    {
                        [...qualifyings].reverse().map((qualifying, index) => {
                            // Si il y a 3 pilotes
                            if(drivers[2]){
                                return (
                                    <CurrentConstructorsThisSeasonQualifyingContentContainer
                                        key={index}
                                        round={qualifying?.round}
                                        race={qualifying?.raceName}
                                        driver1Position=
                                            {
                                                qualifying?.QualifyingResults[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                    qualifying?.QualifyingResults[0]?.position : qualifying?.QualifyingResults[1]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                        qualifying?.QualifyingResults[1]?.position : "--"
                                            }
                                        driver2Position=
                                            {
                                                qualifying?.QualifyingResults[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                    qualifying?.QualifyingResults[1]?.position : qualifying?.QualifyingResults[0]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                        qualifying?.QualifyingResults[0]?.position : "--"
                                            }
                                        driver3Position=
                                            {
                                                qualifying?.QualifyingResults[0]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                    qualifying?.QualifyingResults[0]?.position : qualifying?.QualifyingResults[1]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                        qualifying?.QualifyingResults[1]?.position : "--"
                                            }
                                    />
                                );
                            }
                            else{ // Si il y a 2 pilotes
                                return (
                                    <CurrentConstructorsThisSeasonQualifyingContentContainer
                                        key={index}
                                        round={qualifying?.round}
                                        race={qualifying?.raceName}
                                        driver1Position={qualifying?.QualifyingResults[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ? qualifying?.QualifyingResults[0]?.position : qualifying?.QualifyingResults[1]?.position}
                                        driver2Position={qualifying?.QualifyingResults[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ? qualifying?.QualifyingResults[1]?.position : qualifying?.QualifyingResults[0]?.position}
                                    />
                                )
                            }
                        })
                    }
                </Container>
                <h2 className="fst-italic mt-2" style={textRegular}>SPRINTS</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    {
                        drivers[2] ? ( // Si il y a 3 pilotes
                            <CurrentConstructorsThisSeasonRacesSprintHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                                driver3={drivers[2]?.familyName}
                                driver3Code={drivers[2]?.code}
                            />
                        ) : ( // Si il y a 2 pilotes
                            <CurrentConstructorsThisSeasonRacesSprintHeaderContainer
                                driver1={drivers[0]?.familyName}
                                driver1Code={drivers[0]?.code}
                                driver2={drivers[1]?.familyName}
                                driver2Code={drivers[1]?.code}
                            />
                        )
                    }
                    {
                        [...sprints].reverse().map((sprint, index) => {
                            let totalPoints = parseInt(sprint?.SprintResults[0]?.points) + parseInt(sprint?.SprintResults[1]?.points);
                            
                            // Si il y a 3 pilotes
                            if(drivers[2]){
                                return (
                                    <CurrentConstructorsThisSeasonRacesSprintContentContainer
                                        key={index}
                                        round={sprint?.round}
                                        race={sprint?.raceName}
                                        driver1Position=
                                            {
                                                sprint?.SprintResults[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                    sprint?.SprintResults[0]?.positionText : sprint?.SprintResults[1]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ?
                                                        sprint?.SprintResults[1]?.positionText : "--"
                                            }
                                        driver2Position=
                                            {
                                                sprint?.SprintResults[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                    sprint?.SprintResults[1]?.positionText : sprint?.SprintResults[0]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ?
                                                        sprint?.SprintResults[0]?.positionText : "--"
                                            }
                                        driver3Position=
                                            {
                                                sprint?.SprintResults[0]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                    sprint?.SprintResults[0]?.positionText : sprint?.SprintResults[1]?.Driver?.permanentNumber === drivers[2]?.permanentNumber ?
                                                        sprint?.SprintResults[1]?.positionText : "--"
                                            }
                                        points={totalPoints}
                                    />
                                );
                            }
                            else{ // Si il y a 2 pilotes
                                return (
                                    <CurrentConstructorsThisSeasonRacesSprintContentContainer
                                        key={index}
                                        round={sprint?.round}
                                        race={sprint?.raceName}
                                        driver1Position={sprint?.SprintResults[0]?.Driver?.permanentNumber === drivers[0]?.permanentNumber ? sprint?.SprintResults[0]?.positionText : sprint?.SprintResults[1]?.positionText}
                                        driver2Position={sprint?.SprintResults[1]?.Driver?.permanentNumber === drivers[1]?.permanentNumber ? sprint?.SprintResults[1]?.positionText : sprint?.SprintResults[0]?.positionText}
                                        points={totalPoints}
                                    />
                                )
                            }
                        })
                    }
                </Container>
            </Container>
        );
    }
}