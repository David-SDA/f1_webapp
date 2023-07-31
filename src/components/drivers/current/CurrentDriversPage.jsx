import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";
import { currentDrivers } from "../../../constants/currentDrivers";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentDriversTeamId } from "../../../constants/currentDriversTeamId";

import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";

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
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2023 : Drivers</h1>
                <Row>
                    {
                        drivers.map((driver, index) => {
                            return (
                                <Col lg={3} className="mb-2" key={index}>
                                    <Card className="rounded-5 overflow-hidden" style={{height: "300px"}}>
                                        <a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                                            <Card.Header className="d-flex flex-row justify-content-between align-items-center text-white rounded-top-5 pt-3 pb-3" style={{backgroundColor: currentConstructorColor[currentDriversTeamId[driver.driverId]]}}>
                                                <Image src={flagsNationality[driver?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                                <p className="mb-0"><span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver.familyName}</span></p>
                                                <p className="mb-0 fst-italic" style={textBlack}>{driver?.permanentNumber}</p>
                                            </Card.Header>
                                            <Card.Img variant="top" src={currentDrivers[driver?.driverId]} className="rounded-0" />
                                        </a>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}