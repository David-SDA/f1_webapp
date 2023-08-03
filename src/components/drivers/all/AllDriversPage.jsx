import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

export default function AllDriversPage(){
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/drivers.json?limit=1000");
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

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>All Drivers</h1>
                <Row>
                    {
                        drivers.map((driver, index) => {
                            return (
                                <Col lg={2} className="mb-2" key={index}>
                                    <Card style={{height: "8rem"}}>
                                        <Card.Body>
                                            <Card.Title>
                                                <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                                            </Card.Title>
                                            <Card.Subtitle>
                                                <span className="fst-italic" style={textRegular}>{driver?.nationality}</span>
                                            </Card.Subtitle>
                                        </Card.Body>
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