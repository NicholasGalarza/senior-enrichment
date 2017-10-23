import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { updateStudentData } from '../reducers';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'


class UpdateStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            campusId: 1,
            launchRedirect: false
        }
    }

    validateEmail(email) {
        const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        return email.match(validator); 
    }

    render() {
        const { handleChange, handleSubmit } = this.props;
        console.log(this.props)
        const student = this.props.student || ""
        return (
            <div className="update-form">
                <h1>Make Edits to {student.name}</h1>
                <form onSubmit={(e) => { handleSubmit(this.state.name, this.state.email, this.state.campusId, e), this.setState({ launchRedirect: true }) }} id="new-student-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}
                            placeholder={student.name}
                        />
                        <input type="text"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder={student.email}
                        />
                        <select onClick={(e) => this.setState({ campusId: e.target.value })}>
                            {this.props.campuses.map(campus => {
                                return <option value={campus.id} key={campus.id}>{campus.name}</option>
                            })}
                        </select>
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
                {this.state.lauchRedirect && (
                    <Redirect to={`/students`} />
                )}
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        name: state.name,
        email: state.email,
        campusId: state.campusId
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {

    return {
        handleSubmit(name, email, campusId, event) {
            event.preventDefault();
            const id = ownProps.match.params.studentId;
            dispatch(updateStudentData(id, { name, email, campusId }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateStudent); 