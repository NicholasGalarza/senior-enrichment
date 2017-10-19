import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import Campus from './Campus'

function CampusList(props) {
    const {campuses} = props;

    return (
        <div>
            <h1>Campuses</h1>
            <ul>
                {campuses.map(campus => {
                    return (
                        <li key={campus.id}>
                            <NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink>
                            <button>X</button>
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