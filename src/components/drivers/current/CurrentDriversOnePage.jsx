import React, { useEffect, useState } from "react";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    const [driver, setDriver] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + ".json");
            const data1 = await response1.json();
            setDriver(data1.MRData.DriverTable.Drivers[0]);
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
                    <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                </h1>
                <Row>
                    <Col lg={4} className="bg-info">
                        test
                    </Col>
                    <Col lg={8} className="bg-danger">
                        test
                    </Col>
                </Row>
            </Container>
        );
    }
}