import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

class Campus extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { students, campuses } = this.props;

        const campus = (campuses.length) ? campuses.filter(campus => {
            return campus.id === Number(this.props.match.params.campusId);
        })[0] : {};

        const studentsOnCampus = (students.length) ? students.filter(student => {
            return student.campusId === Number(this.props.match.params.campusId);
        }) : [];
        console.log('heeeeey', campus);
        return (
            <div>
                <p>{campus && campus.id}</p>
                <p>{campus && campus.name}</p>
                <img src={campus && campus.image}></img>
                <p>Students</p>
                <ul>
                    {studentsOnCampus.map(student => {
                        return <li key={student.id}><NavLink to={`/students/${student.id}`} key={student.id}>{student.name}</NavLink></li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    students: state.students,
    campuses: state.campuses
});

export default connect(
    mapStateToProps
)(Campus); 