import React, { useEffect, useState } from "react";

import TracksCardContainer from "../TracksCardContainer";
import AllTracksFilterContainer from "./AllTracksFilterContainer";
import { allTracks } from "../../../constants/allTracks";
import { flags } from "../../../constants/flags";

import { Container, Row, Spinner } from "react-bootstrap";

export default function AllTracksPage() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("circuitName"); // Filtre (de base : nom du circuit)
    const [sortOrder, setSortOrder] = useState("ascending"); // Ordre
    const [search, setSearch] = useState(""); // Recherche

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/circuits.json?limit=100");
            const data = await response.json();
            setTracks(data.MRData.CircuitTable.Circuits);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    // Gérer le changement de filtre
    const handleFilterOptionChange = (event) => {
        setFilter(event.target.value);
    }

    // Gérer le changement de l'ordre
    const handleSortChange = () => {
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }

    // Gérer l'écriture dans la barre de recherche
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const getSortedData = () => {
        const sortedData = [...tracks]; // On copie les champions que l'on récupère
        sortedData.sort((a, b) => { // On effectue le tri
            let aValue; // On crée les variables
            let bValue; // pour les comparés

            // On leurs associe des valeurs en fonction du filtre choisi
            if(filter === "circuitName"){
                aValue = a?.circuitName;
                bValue = b?.circuitName;
            }
            else if(filter === "Location.country"){
                aValue = a?.Location?.country;
                bValue = b?.Location?.country;
            }
            else if(filter === "Location.locality"){
                aValue = a?.Location?.locality;
                bValue = b?.Location?.locality;
            }

            // On effectue le tri pour de bon
            if(sortOrder === 'ascending'){
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
            else{
                return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
            }
        });
        return sortedData;
    }

    // Récupérer les données grâce à la recherche
    const getSearchedData = () =>{
        return getSortedData().filter((track) =>{ // On filtre les résultat avec le nom complet
            return track?.circuitName.toLowerCase().includes(search.toLowerCase());
        });
    }

    const sortedData = getSearchedData();

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic" style={textRegular}>F1 2023 : Tracks</h1>
                <AllTracksFilterContainer
                    search={search}
                    handleSearchChange={handleSearchChange}
                    filter={filter}
                    handleFilterOptionChange={handleFilterOptionChange}
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                />
                <Row>
                    {
                        sortedData.map((track, index) => {
                            return (
                                <TracksCardContainer
                                    key={index}
                                    circuitId={track?.circuitId}
                                    circuitName={track?.circuitName}
                                    imageTrack={allTracks[track?.circuitId]}
                                    imageCountry={flags[track?.Location?.country]}
                                    country={track?.Location?.country}
                                    locality={track?.Location?.locality}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
