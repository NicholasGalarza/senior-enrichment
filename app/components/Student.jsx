import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

// This component must now make a thunk to api for '/student/studentId' based on NavLink
class Student extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const students = this.props.students, 
              campuses = this.props.campuses;
       
        const student = (students.length) ? 
            students.filter(student => {
                return student.id === Number(this.props.match.params.studentId);
             })[0] : {}; 
   
        const studentCampus = (campuses.length) ?
            campuses.filter(function(campus) {
                return student.campusId === campus.id; 
            })[0] : {}; 
        

        return (
            <div>
                <p>{student.id}</p>
                <p>{student.name}</p>
                <p>{student.email}</p>
                <NavLink to={`/campuses/${student.campusId}`}>{student && studentCampus.name}</NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    students: state.students,
    campuses: state.campuses
});

export default connect(
    mapStateToProps
)(Student); 