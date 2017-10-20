import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import NewStudent from './NewStudent'
import {deleteSelectedStudent} from '../reducers'

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick(id) {
        this.props.deleteStudent(id)
    }

    render() {
        const { students } = this.props;
        return (
            <div>
                <NewStudent />
                <h1>Student List</h1>
                <ul>
                    {students.map((student) =>
                        <li key={student.id}>
                            {student.id}
                            <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                            <button onClick={e => this.handleClick(student.id)}>Delete</button>
                            <NavLink to={`/students/update/${student.id}`}>Update</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    students: state.students,
    campuses: state.campuses
});

const mapDispatchToProps = function (dispatch) {
    return {
        deleteStudent(id) {
            dispatch(deleteSelectedStudent(id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentList); 