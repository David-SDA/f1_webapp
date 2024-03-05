import React, { useEffect, useState } from "react";

import { Container, Spinner } from "react-bootstrap";
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

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>{constructor?.name}</h1>
            </Container>
        )
    }
}