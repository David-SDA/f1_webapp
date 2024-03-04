import React from "react";

import { Col, Form, FormControl, Row } from "react-bootstrap";

export default function AllConstructorsFilterContainer({
    search,
    handleSearchChange,
    filter,
    handleFilterOptionChange,
    handleSortChange,
    sortOrder
}){
    return (
        <Row className="d-flex flex-row align-items-center mb-3">
            <Col xs={12} sm={7} md={7} lg={8} className="mb-2">
                <FormControl type="text" placeholder="Search by name" value={search} onChange={handleSearchChange} className="mr-sm-2" style={{fontFamily: "Formula1-Regular"}} />
            </Col>
            <Col xs={10} sm={4} md={4} lg={3} className="mb-2">
                <Form.Select value={filter} onChange={handleFilterOptionChange} style={{fontFamily: "Formula1-Regular"}}>
                    <option value="name">Name</option>
                    <option value="nationality">Nationality</option>
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
    );
}