import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import CampusList from './CampusList'
import StudentList from './StudentList'



export default function Navbar() {
    return (
        <div className="navbar">
            <h3 id="title">Margaret Hamilton <br />Interplanetary <br />Academy of JavaScript</h3>
            <div className="buttons-group">
                <NavLink to='/'>Home</NavLink>
                <NavLink to="/students">Students</NavLink>
                <NavLink to="/campuses">Campuses</NavLink>
            </div>
        </div>
    )
}