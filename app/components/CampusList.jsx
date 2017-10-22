import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteSelectedCampus } from '../reducers'
import store from '../store'
import Campus from './Campus'
import NewCampus from './NewCampus'

class CampusList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(id) {
        console.log('this fired off', id); 
        this.props.deleteCampus(id)
    }
    render() {
        const { campuses } = this.props;
        return (
            <div>
                <h1>Campuses</h1>
                <NavLink to={`/campuses/add`}>Add Campus</NavLink>
                <ul>
                    {campuses.map(campus => {
                        return (
                            <li key={campus.id}>
                                <NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink>
                                <button onClick={e => this.handleClick(campus.id)} >Delete</button>
                                <NavLink to={`/campuses/update/${campus.id}`}>Update</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    campuses: state.campuses
});

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        deleteCampus(id) {
            dispatch(deleteSelectedCampus(id))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampusList); 