import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

class Campus extends Component {

    constructor(props) {
        super(props); 
    }

    render() {
        const students = this.props.students, 
              campuses = this.props.campuses;

        const campus = (campuses.length) ? campuses.filter(campus => {
            return campus.id === Number(this.props.match.params.campusId);
        })[0] : {}; 
        
        const studentsOnCampus = (students.length) ? students.filter(student => {
            return student.id === Number(this.props.match.params.campusId);
        }) : []; 
        
        return (
            <div>
                <p>{campus && campus.id}</p>
                <p>{campus && campus.name}</p>
                <p>Students</p>
                <ul>
                {studentsOnCampus.map(student => {
                    return <NavLink to={`/students/${student.id}`} key={student.id}>{student.name}</NavLink>
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