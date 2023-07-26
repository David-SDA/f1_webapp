import React, { useEffect, useState } from "react";

import DriverChampionsCardContainer from "./DriverChampionsCardContainer";
import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Row, Spinner } from "react-bootstrap";
import DriverChampionsFilterContainer from "./DriverChampionsFilterContainer";

export default function DriverChampionsPage() {
    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("season"); // Filtre (de base : saison)
    const [sortOrder, setSortOrder] = useState("descending"); // Ordre
    const [search, setSearch] = useState(""); // Recherche

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/driverStandings/1.json?limit=100");
            const data = await response.json();
            setChampions(data.MRData.StandingsTable.StandingsLists);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

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

    // Tri des données
    const getSortedData = () => {
        const sortedData = [...champions]; // On copie les champions que l'on récupère
        sortedData.sort((a, b) => { // On effectue le tri
            let aValue; // On crée les variables
            let bValue; // pour les comparés

            // On leurs associe des valeurs en fonction du filtre choisi
            if(filter === "season"){
                aValue = a.season;
                bValue = b.season;
            }
            else if(filter === "DriverStandings[0].Driver.givenName") {
                aValue = a.DriverStandings[0]?.Driver?.givenName;
                bValue = b.DriverStandings[0]?.Driver?.givenName;
            }
            else if(filter === "DriverStandings[0].Driver.familyName") {
                aValue = a.DriverStandings[0]?.Driver?.familyName;
                bValue = b.DriverStandings[0]?.Driver?.familyName;
            }
            else if (filter === "DriverStandings[0].Constructors[0].name") {
                aValue = a.DriverStandings[0]?.Constructors[0]?.name;
                bValue = b.DriverStandings[0]?.Constructors[0]?.name;
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
        return getSortedData().filter((champion) =>{ // On filtre les résultat avec le nom complet
            const fullName = champion?.DriverStandings[0]?.Driver?.givenName + " " + champion?.DriverStandings[0]?.Driver?.familyName;
            return fullName.toLowerCase().includes(search.toLowerCase());
        });
    }
    const searchedData = getSearchedData();

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>Driver Champions</h1>
                <DriverChampionsFilterContainer
                    search={search}
                    handleSearchChange={handleSearchChange}
                    filter={filter}
                    handleFilterOptionChange={handleFilterOptionChange}
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                />
                <Row>
                    {
                        searchedData.map((champion, index) => {
                            return (
                                <DriverChampionsCardContainer
                                    key={index}
                                    season={champion?.season}
                                    driverId={champion?.DriverStandings[0]?.Driver?.driverId}
                                    givenName={champion?.DriverStandings[0]?.Driver?.givenName}
                                    familyName={champion?.DriverStandings[0]?.Driver?.familyName}
                                    team={champion?.DriverStandings[0]?.Constructors[0]?.name}
                                    wins={champion?.DriverStandings[0]?.wins}
                                    points={champion?.DriverStandings[0]?.points}
                                    image={flagsNationality[champion?.DriverStandings[0]?.Driver?.nationality]}
                                    nationality={champion?.DriverStandings[0]?.Driver?.nationality}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
