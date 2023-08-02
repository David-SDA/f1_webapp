import React, { useEffect, useState } from "react";

import CurrentConstructorsCard from "./CurrentConstructorsCard";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorImage } from "../../../constants/currentConstructorImage";

import { Container, Row, Spinner } from "react-bootstrap";

export default function CurrentConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/constructors.json");
            const data = await response.json();
            setConstructors(data.MRData.ConstructorTable.Constructors);
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
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2023 : Constructors</h1>
                <Row>
                    {
                        constructors.map((constructor, index) => {
                            return (
                                <CurrentConstructorsCard
                                    key={index}
                                    constructorId={constructor?.constructorId}
                                    color={currentConstructorColor[constructor?.constructorId]}
                                    imageFlag={flagsNationality[constructor?.nationality]}
                                    name={constructor?.name}
                                    imageTeam={currentConstructorImage[constructor?.constructorId]}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}