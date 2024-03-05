import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AllConstructorsOnePage(){
    let { constructorId } = useParams();

    const [constructor, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const responseConstructor = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + ".json");

            const data1 = await responseConstructor.json();

            setConstructors(data1.MRData.ConstructorTable.Constructors[0]);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

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
                <h1 className="fst-italic mt-1" style={textBold}>{constructor?.name}</h1>
                <Row className="d-flex justify-content-center">
                    <Col md={6} lg={4}>
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>NATIONALITY</p>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Image src={flagsNationality[constructor?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{constructor?.nationality}</p>
                            </div>
                            <div></div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}