import React, { useEffect, useState } from "react";

import CurrentConstructorsDetailsContainer from "./CurrentConstructorsDetailsContainer";
import { currentConstructorImage } from "../../../constants/currentConstructorImage";
import { flagsNationality } from "../../../constants/flagsNationality";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentConstuctorsOnePage(){
    let { constructorId } = useParams();

    const [standing, setStanding] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/constructorStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/drivers.json");

            const data1 = await response1.json();
            const data2 = await response2.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDrivers(data2.MRData.DriverTable.Drivers);
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
            </Container>
        );
    }
}