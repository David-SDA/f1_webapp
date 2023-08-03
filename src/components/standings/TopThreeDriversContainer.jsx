import React, { useEffect, useState } from "react";

import SmallDriverContainer from "./SmallDriverContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function TopThreeDriversContainer(){
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json?limit=3');
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

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                {
                    standings.map((driver, index) => {
                        return (
                            <SmallDriverContainer
                                position={driver?.position}
                                firstName={driver?.Driver?.givenName}
                                name={driver?.Driver?.familyName}
                                points={driver?.points}
                                color={currentConstructorColor[driver?.Constructors[0]?.constructorId]}
                                driverId={driver?.Driver?.driverId}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}