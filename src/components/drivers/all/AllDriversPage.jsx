import React, { useEffect, useState } from "react";

import AllDriversFilterContainer from "./AllDriversFilterContainer";
import AllDriversCardContainer from "./AllDriversCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";


export default function AllDriversPage(){
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("familyName"); // Filtre (de base : nom de famille)
    const [sortOrder, setSortOrder] = useState("ascending"); // Ordre
    const [search, setSearch] = useState(""); // Recherche

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

    // Tri des données
    const getSortedData = () => {
        const sortedData = [...drivers]; // On copie les pilotes que l'on récupère
        sortedData.sort((a, b) => { // On effectue le tri
            let aValue; // On crée les variables
            let bValue; // pour les comparés

            // On leurs associe des valeurs en fonction du filtre choisi
            if(filter === "familyName"){
                aValue = a?.familyName;
                bValue = b?.familyName;
            }
            else if(filter === "givenName"){
                aValue = a?.givenName;
                bValue = b?.givenName;
            }
            else if(filter === "nationality"){
                aValue = a?.nationality;
                bValue = b?.nationality
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
        return getSortedData().filter((driver) =>{ // On filtre les résultat avec le nom complet
            const fullName = driver?.givenName + " " + driver?.familyName;
            return fullName.toLowerCase().includes(search.toLowerCase());
        });
    }
    const searchedData = getSearchedData();

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
                <h1 className="fst-italic mt-1" style={textRegular}>All Drivers</h1>
                <AllDriversFilterContainer
                    search={search}
                    handleSearchChange={handleSearchChange}
                    filter={filter}
                    handleFilterOptionChange={handleFilterOptionChange}
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                />
                <Row>
                    {
                        searchedData.map((driver, index) => {
                            return (
                                <AllDriversCardContainer
                                    key={index}
                                    driverId={driver?.driverId}
                                    givenName={driver?.givenName}
                                    familyName={driver?.familyName}
                                    nationality={driver?.nationality}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}