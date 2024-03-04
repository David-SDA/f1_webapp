import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";
import AllConstructorsCardContainer from "./AllConstructorsCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";

export default function AllConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/constructors.json?limit=250");
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
                <h1 className="fst-italic mt-1" style={textRegular}>All Constructors</h1>
                <Row>
                    {
                        constructors.map((constructor, index)=>{
                            return (
                                <AllConstructorsCardContainer
                                    key={index}
                                    constructorId={constructor?.constructorId}
                                    nationality={constructor?.nationality}
                                    imageFlag={flagsNationality[constructor?.nationality]}
                                    name={constructor?.name}
                                />
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}