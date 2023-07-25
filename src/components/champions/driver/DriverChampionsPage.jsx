import React, { useEffect, useState } from "react";

import DriverChampionsCardContainer from "./DriverChampionsCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";

export default function DriverChampionsPage() {
    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/driverStandings/1.json?limit=100");
            const data = await response.json();
            setChampions(data.MRData.StandingsTable.StandingsLists);
        }catch(error){
            console.log(error);
        }finally{
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
            <Container>
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>Driver Champions</h1>
                <Row>
                    {
                        champions.map((champion, index) => {
                            return (
                                <DriverChampionsCardContainer
                                    key={index}
                                    season={champion?.season}
                                    driverId={champion?.DriverStandings[0]?.Driver?.driverId}
                                    givenName={champion?.DriverStandings[0]?.Driver?.givenName}
                                    familyName={champion?.DriverStandings[0]?.Driver?.familyName}
                                    team={champion?.DriverStandings[0]?.Constructors[0]?.name}
                                    wins={champion?.DriverStandings[0]?.wins}
                                    points={champion?.DriverStandings[0]?.points}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
