import React, { useEffect, useState } from "react";

import ConstructorStandingsHeaderContainer from "./ConstructorStandingsHeaderContainer";
import ConstructorStandingsContentContainer from "./ConstructorStandingsContentContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function ConstructorStandingsPage() {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);

    const fetchInfo = async () => {
        try{
            const response = await fetch("https://ergast.com/api/f1/current/constructorStandings.json");
            const data = await response.json();
            setStandings(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleTeamClick = (teamIndex) => {
        setSelectedTeamIndex(teamIndex);
    }

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 : Constructor Standings</h1>
                <Container className="rounded p-1 mb-3" style={{backgroundColor: "#38383f"}}>
                    <ConstructorStandingsHeaderContainer />
                    {
                        standings.map((team, index) => {
                            return (
                                <ConstructorStandingsContentContainer
                                    key={index}
                                    teamId={team?.Constructor?.constructorId}
                                    position={team?.positionText}
                                    color={currentConstructorColor[team?.Constructor?.constructorId]}
                                    team={currentConstructorSmallText[team?.Constructor?.constructorId]}
                                    wins={team?.wins}
                                    points={team?.points}
                                    isSelected={selectedTeamIndex === index}
                                    onClick={() => handleTeamClick(index)}
                                    selectedTeamPoints={selectedTeamIndex !== null ? standings[selectedTeamIndex].points : 0}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}
