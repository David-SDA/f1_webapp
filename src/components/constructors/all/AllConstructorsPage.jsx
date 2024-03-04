import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";
import AllConstructorsCardContainer from "./AllConstructorsCardContainer";

import { Container, Row, Spinner } from "react-bootstrap";
import AllConstructorsFilterContainer from "./AllConstructorsFilterContainer";

export default function AllConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("name"); // Filtre (de base : nom)
    const [sortOrder, setSortOrder] = useState("ascending"); // Ordre
    const [search, setSearch] = useState(""); // Recherche

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
        const sortedData = [...constructors]; // On copie les constructeurs que l'on récupère
        sortedData.sort((a, b) => { // On effectue le tri
            let aValue; // On crée les variables
            let bValue; // pour les comparés

            // On leurs associe des valeurs en fonction du filtre choisi
            if(filter === "name"){
                aValue = a?.name;
                bValue = b?.name;
            }
            else if(filter === "nationality"){
                aValue = a?.nationality;
                bValue = b?.nationality;
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
        return getSortedData().filter((constructor) =>{ // On filtre les résultat avec le nom
            return constructor?.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    const sortedData = getSearchedData();

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
                <AllConstructorsFilterContainer
                    search={search}
                    handleSearchChange={handleSearchChange}
                    filter={filter}
                    handleFilterOptionChange={handleFilterOptionChange}
                    handleSortChange={handleSortChange}
                    sortOrder={sortOrder}
                />
                <Row>
                    {
                        sortedData.map((constructor, index)=>{
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