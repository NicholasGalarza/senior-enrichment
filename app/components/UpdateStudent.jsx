import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {updateStudentData} from '../reducers';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'; 


class UpdateStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: ""
        }
    }

    render() {
        const { handleChange, handleSubmit} = this.props;
       
        return (
            <div className="update-form">
                <h1>Make Edits to Student</h1>
                <form onSubmit={(e) => handleSubmit(this.state.name, this.state.email, e)} id="new-student-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({name: e.target.value})}
                            value={this.state.name}
                            placeholder="update student name..."
                        />
                        <input type="text"
                            name = "email"
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="change student email..."
                        />
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        name: state.name, 
        email: state.email
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
   
    return {
        handleSubmit(name, email, event) {
            event.preventDefault(); 
            const id = ownProps.match.params.studentId; 
            dispatch(updateStudentData(id, {name, email})); 
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateStudent); 