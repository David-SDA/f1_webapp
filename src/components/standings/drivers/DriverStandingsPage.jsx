import React, { useEffect, useState } from "react";

import DriverStandingsHeaderContainer from "./DriverStandingsHeaderContainer";
import DriverStandingsContentContainer from "./DriverStandingsContentContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function DriverStandingsPage() {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState(0);

    const fetchInfo = async () => {
        try{
            const response = await fetch("https://ergast.com/api/f1/current/driverStandings.json");
            const data = await response.json();
            setStandings(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleDriverClick = (driverIndex) => {
        setSelectedDriverIndex(driverIndex);
    }

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 : Driver Standings</h1>
                <Container className="rounded p-1 mb-3" style={{backgroundColor: "#38383f"}}>
                    <DriverStandingsHeaderContainer />
                    {
                        standings.map((driver, index) => {
                            return (
                                <DriverStandingsContentContainer
                                    key={index}
                                    position={driver?.positionText}
                                    color={currentConstructorColor[driver?.Constructors[0]?.constructorId]}
                                    givenName={driver?.Driver?.givenName}
                                    familyName={driver?.Driver?.familyName}
                                    code={driver?.Driver?.code}
                                    team={currentConstructorSmallText[driver?.Constructors[0]?.constructorId]}
                                    wins={driver?.wins}
                                    points={driver?.points}
                                    isSelected={selectedDriverIndex === index}
                                    onClick={() => handleDriverClick(index)}
                                    selectedDriverPoints={selectedDriverIndex !== null ? standings[selectedDriverIndex].points : 0}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}
