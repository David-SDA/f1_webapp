import React, { useEffect, useState } from "react";

import ConstructorChampionsFilterContainer from "./ConstructorChampionsFilterContainer";
import ConstructorChampionsCardContainer from "./ConstructorChampionsCardContainer";
import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Row, Spinner } from "react-bootstrap";

export default function ConstructorChampionsPage() {
    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("season"); // Filtre (de base : saison)
    const [sortOrder, setSortOrder] = useState("descending"); // Ordre
    const [search, setSearch] = useState(""); // Recherche

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/constructorStandings/1.json?limit=100");
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
            else if(filter === "ConstructorStandings[0].Constructor.name"){
                aValue = a?.ConstructorStandings[0]?.Constructor?.name;
                bValue = b?.ConstructorStandings[0]?.Constructor?.name;
            }
            else if(filter === "ConstructorStandings[0].Constructor.nationality"){
                aValue = a?.ConstructorStandings[0]?.Constructor?.nationality;
                bValue = b?.ConstructorStandings[0]?.Constructor?.nationality;
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
            return champion?.ConstructorStandings[0]?.Constructor?.name.toLowerCase().includes(search.toLowerCase());
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
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>Constructor Champions</h1>
                <ConstructorChampionsFilterContainer
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
                                <ConstructorChampionsCardContainer
                                    key={index}
                                    season={champion?.season}
                                    constructorId={champion?.ConstructorStandings[0]?.Constructor?.constructorId}
                                    name={champion?.ConstructorStandings[0]?.Constructor?.name}
                                    wins={champion?.ConstructorStandings[0]?.wins}
                                    points={champion?.ConstructorStandings[0]?.points}
                                    image={flagsNationality[champion?.ConstructorStandings[0]?.Constructor?.nationality]}
                                    nationality={champion?.ConstructorStandings[0]?.Constructor?.nationality}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
