import React, { useEffect, useState } from "react";

import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllConstructorsOneDetailsContainer from "./AllConstructorsOneDetailsContainer";

export default function AllConstructorsOnePage(){
    let { constructorId } = useParams();

    const [constructor, setConstructors] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const responseConstructor = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + ".json");
            const responseDrivers = await fetch("http://ergast.com/api/f1/constructors/" + constructorId + "/drivers.json?limit=200");

            const dataConstructor = await responseConstructor.json();
            const dataDrivers = await responseDrivers.json();

            setConstructors(dataConstructor.MRData.ConstructorTable.Constructors[0]);
            setDrivers(dataDrivers.MRData.DriverTable.Drivers);

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
                <AllConstructorsOneDetailsContainer 
                    nationality={constructor?.nationality}
                    nbDrivers={drivers.length}
                />
            </Container>
        )
    }
}