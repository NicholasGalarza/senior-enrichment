import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

function StudentList(props) {

    const { students } = props;

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.id}
                        <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                        <button>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    students: state.students, 
    campuses: state.campuses
});

const mapDispatchToProps = function (dispatch) {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentList); 