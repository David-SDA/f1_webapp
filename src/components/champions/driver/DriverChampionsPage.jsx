import React, { useEffect, useState } from "react";

import DriverChampionsCardContainer from "./DriverChampionsCardContainer";

import { Col, Container, Form, FormControl, Row, Spinner } from "react-bootstrap";

export default function DriverChampionsPage() {
    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("season");
    const [sortOrder, setSortOrder] = useState("descending");
    const [search, setSearch] = useState("");

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

    const handleFilterOptionChange = (event) => {
        setFilter(event.target.value);
    }

    const handleSortChange = () => {
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const getSortedData = () => {
        const sortedData = [...champions];
        sortedData.sort((a, b) => {
            let aValue;
            let bValue;

            if(filter === "season"){
                aValue = a.season;
                bValue = b.season;
            }
            else if(filter === "DriverStandings[0].Driver.givenName") {
                aValue = a.DriverStandings[0].Driver.givenName;
                bValue = b.DriverStandings[0].Driver.givenName;
            }
            else if(filter === "DriverStandings[0].Driver.familyName") {
                aValue = a.DriverStandings[0].Driver.familyName;
                bValue = b.DriverStandings[0].Driver.familyName;
            }
            else if (filter === "DriverStandings[0].Constructors[0].name") {
                aValue = a.DriverStandings[0].Constructors[0].name;
                bValue = b.DriverStandings[0].Constructors[0].name;
            }

            if(sortOrder === 'ascending'){
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
            else{
                return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
            }
        });
        return sortedData;
    }

    const getSearchedData = () =>{
        return getSortedData().filter((champion) =>{
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
                <Row className="d-flex flex-row align-items-center mb-3">
                    <Col xs={12} sm={7} md={7} lg={8} className="mb-2">
                        <FormControl type="text" placeholder="Search by family name" value={search} onChange={handleSearchChange} className="mr-sm-2" style={{fontFamily: "Formula1-Regular"}} />
                    </Col>
                    <Col xs={10} sm={4} md={4} lg={3} className="mb-2">
                        <Form.Select value={filter} onChange={handleFilterOptionChange} style={{fontFamily: "Formula1-Regular"}}>
                            <option value="season">Season</option>
                            <option value="DriverStandings[0].Driver.givenName">First Name</option>
                            <option value="DriverStandings[0].Driver.familyName">Last Name</option>
                            <option value="DriverStandings[0].Constructors[0].name">Constructor</option>
                        </Form.Select>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} className="mb-2 text-end">
                        {
                            sortOrder === "ascending" ? (
                                <span className="d-flex flex-column user-select-none" onClick={handleSortChange} style={{cursor: "pointer"}}>
                                    <span className="opacity-100">&#x25B2;</span>
                                    <span className="opacity-25">&#x25BC;</span>
                                </span>
                            ) : (
                                <span className="d-flex flex-column user-select-none" onClick={handleSortChange} style={{cursor: "pointer"}}>
                                    <span className="opacity-25">&#x25B2;</span>
                                    <span className="opacity-100">&#x25BC;</span>
                                </span>
                            )
                        }
                    </Col>
                </Row>
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
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
