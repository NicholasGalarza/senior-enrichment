import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import Campus from './Campus'
import NewCampus from './NewCampus'

function CampusList(props) {
    const {campuses} = props;

    return (
        <div>
            <NewCampus />
            <h1>Campuses</h1>
            <ul>
                {campuses.map(campus => {
                    return (
                        <li key={campus.id}>
                            <NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink>
                            <button>X</button>
                            <NavLink to={`/campuses/update/${campus.id}`}>Update</NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    campuses: state.campuses
});

const mapDispatchToProps = function (dispatch) {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampusList); 