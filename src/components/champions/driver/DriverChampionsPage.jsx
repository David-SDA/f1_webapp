import React, { useEffect, useState } from "react";

import DriverChampionsCardContainer from "./DriverChampionsCardContainer";

import { Col, Container, Form, FormControl, Row, Spinner } from "react-bootstrap";

export default function DriverChampionsPage() {
    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("season");
    const [sortOrder, setSortOrder] = useState("descending");

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

    const sortedData = getSortedData();

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
                    <Col lg={8}>
                        <FormControl type="text" placeholder="Search by family name" className="mr-sm-2" />
                    </Col>
                    <Col lg={2}>
                        <Form.Select value={filter} onChange={handleFilterOptionChange}>
                            <option value="season">Season</option>
                            <option value="DriverStandings[0].Driver.givenName">First Name</option>
                            <option value="DriverStandings[0].Driver.familyName">Last Name</option>
                            <option value="DriverStandings[0].Constructors[0].name">Constructor</option>
                        </Form.Select>
                    </Col>
                    <Col lg={2}>
                        {
                            sortOrder === "ascending" ? (
                                <span onClick={handleSortChange} style={{cursor: "pointer"}}>&#x25B2; Ascending</span>
                            ) : (
                                <span onClick={handleSortChange} style={{cursor: "pointer"}}>&#x25BC; Descending</span>
                            )
                        }
                    </Col>
                </Row>
                <Row>
                    {
                        sortedData.map((champion, index) => {
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
