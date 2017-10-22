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
            email: "", 
            campusId: ""
        }
    }

    render() {
        const { handleChange, handleSubmit} = this.props;
        return (
            <div className="update-form">
                <h1>Make Edits to Student</h1>
                <form onSubmit={(e) => handleSubmit(this.state.name, this.state.email, this.state.campusId, e)} id="new-student-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({name: e.target.value})}
                            value={this.state.name}
                            placeholder='name...'
                        />
                        <input type="text"
                            name = "email"
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="email..."
                        />
                        <select  onClick={(e) => this.setState({campusId: e.target.value})}>
                            {this.props.campuses.map(campus => {
                                return <option value={campus.id} key={campus.id}>{campus.name}</option>
                            })}
                        </select>
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
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
            dispatch(updateStudentData(id, {name, email, campusId})); 
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateStudent); 