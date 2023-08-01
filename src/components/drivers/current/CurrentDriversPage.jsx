import React, { useEffect, useState } from "react";

import CurrentDriversCardContainer from "./CurrentDriversCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";

export default function CurrentDriversPage(){
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/drivers.json");
            const data = await response.json();
            setDrivers(data.MRData.DriverTable.Drivers);
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

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2023 : Drivers</h1>
                <Row>
                    {
                        drivers.map((driver, index) => {
                            return (
                                <CurrentDriversCardContainer
                                    key={index}
                                    driverId={driver?.driverId}
                                    nationality={driver?.nationality}
                                    givenName={driver?.givenName}
                                    familyName={driver?.familyName}
                                    permanentNumber={driver?.permanentNumber}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}