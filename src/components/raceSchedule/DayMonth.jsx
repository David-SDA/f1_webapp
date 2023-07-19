import React from "react";

export default function DayMonth({date}){
    return (
        <div className="d-flex flex-column align-items-center ms-2 me-2">
            <p className="h4 mb-0" style={{fontFamily: "Formula1-Bold"}}>{date.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
            <p className="m-0 rounded-5 text-center ps-3 pe-3" style={{backgroundColor: "#e8e8e8", fontFamily: "Formula1-Regular"}}>{date.toLocaleDateString('en-GB', {month: 'short'})}</p>
        </div>
    );
}