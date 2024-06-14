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
            // Vérification si les données sont en cache
            const cachedConstructorChampions = localStorage.getItem('constructor_champions');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching champions data...');

            // Si les données sont en cache
            if(cachedConstructorChampions){
                // On extrait les données du cache
                const { constructorChampions } = JSON.parse(cachedConstructorChampions);
                // On extrait la date de la fin de l'année
                const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
                //console.log('Found cached data:', constructorChampions);

                // Si la date actuelle est avant la fin de l'année, on utilise les données du cache
                if(currentDateTime < endOfYear){
                    //console.log('Using cached data...');
                    setChampions(constructorChampions);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('constructor_champions');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("http://ergast.com/api/f1/constructorStandings/1.json?limit=100");
            const data = await response.json();
            const constructorChampions = data.MRData.StandingsTable.StandingsLists;
            setChampions(constructorChampions);
            localStorage.setItem('constructor_champions', JSON.stringify({ constructorChampions }));
        }
        catch(error){
            console.log(error);
        }
        finally{
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
