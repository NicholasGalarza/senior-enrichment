import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {addNewStudent} from '../reducers';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'; 


class NewStudent extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            email: ""
        }
    }
    
    render() {
        const {handleChange, handleSubmit} = this.props; 

        return (
            <div className="campus-form">
                <h1>Add New Student</h1>
                <form onSubmit={(e) => handleSubmit(this.state.name, this.state.email, e)} id="new-campus-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({name: e.target.value})}
                            value={this.state.name}
                            placeholder="enter student name..."
                        />
                        <input type="text"
                            name = "email"
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder="insert email..."
                        />
                        <button type="submit">Add Student</button>
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
            console.log('from post', {name, email})
            event.preventDefault(); 
            dispatch(addNewStudent({name, email})); 
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewStudent); 