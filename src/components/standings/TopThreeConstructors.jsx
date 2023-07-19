import React, { useEffect, useState } from "react";

import SmallConstructor from "./SmallConstructor";
import { currentConstructorColor } from "../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function TopThreeConstructors(){
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json?limit=3');
            const data = await response.json();
            setStandings(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
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
                    standings.map((constructor, index) => {
                        return (
                            <SmallConstructor
                                position={constructor?.position}
                                name={currentConstructorSmallText[constructor?.Constructor?.constructorId]}
                                points={constructor?.points}
                                color={currentConstructorColor[constructor?.Constructor?.constructorId]}
                                key={index}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}