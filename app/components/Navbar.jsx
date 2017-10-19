import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import CampusList from './CampusList'
import StudentList from './StudentList'


export default function Navbar() {
    return (
        <div className="navbar">
            <div className="buttons-group">
                <h3>Navbar Place Holder</h3>
                <NavLink to='/'>Home</NavLink>
                <NavLink to="/students">Students</NavLink>
                <NavLink to="/campuses">Campuses</NavLink>
            </div>
        </div>
    )
}