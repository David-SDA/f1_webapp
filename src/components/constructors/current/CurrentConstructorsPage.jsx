import React, { useEffect, useState } from "react";

import CurrentConstructorsCardContainer from "./CurrentConstructorsCardContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorImage } from "../../../constants/currentConstructorImage";

import { Container, Row, Spinner } from "react-bootstrap";

export default function CurrentConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedCurrentConstructors = localStorage.getItem('current_constructors');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching current constructors data...');

            // Si les données sont en cache
            if(cachedCurrentConstructors){
                // On extrait les données du cache
                const { currentConstructors } = JSON.parse(cachedCurrentConstructors);
                // On extrait la date de la fin de l'année
                const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
                //console.log('Found cached data:', currentConstructors);

                // Si la date actuelle est avant la fin de l'année, on utilise les données du cache
                if(currentDateTime < endOfYear){
                    //console.log('Using cached data...');
                    setConstructors(currentConstructors);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('current_constructors');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("https://ergast.com/api/f1/current/constructors.json");
            const data = await response.json();
            const currentConstructors = data.MRData.ConstructorTable.Constructors;
            setConstructors(currentConstructors);
            localStorage.setItem('current_constructors', JSON.stringify({ currentConstructors }));
        }
        catch(error){
            console.log(error);
        }
        finally{
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
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2024 : Constructors</h1>
                <Row>
                    {
                        constructors.map((constructor, index) => {
                            return (
                                <CurrentConstructorsCardContainer
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