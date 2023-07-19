import React, { useEffect, useState } from "react";

import SmallDriver from "./SmallDriver";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Container, Spinner } from "react-bootstrap";

export default function TopThreeDrivers(){
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
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                {
                    standings.map((driver, index) => {
                        return (
                            <SmallDriver
                                position={driver?.position}
                                firstName={driver?.Driver?.givenName}
                                name={driver?.Driver?.familyName}
                                points={driver?.points}
                                color={currentConstructorColor[driver?.Constructors[0]?.constructorId]}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}