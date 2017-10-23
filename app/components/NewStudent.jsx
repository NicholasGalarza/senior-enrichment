import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import store from '../store';
import { addNewStudent } from '../reducers';
import { Route, Switch, NavLink } from 'react-router-dom';


class NewStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            campusId: 1,
            lauchRedirect: false
        }
    }

    render() {
        const { handleChange, handleSubmit } = this.props;

        return (
            <div className="addition-form">
                <h1>Add New Student</h1>
                <form onSubmit={(e) => { handleSubmit(this.state.name, this.state.email, this.state.campusId, e), this.setState({ lauchRedirect: true }) }} id="new-campus-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}
                            placeholder="enter student name..."
                        />
                        <input type="text"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder="insert email..."
                        />
                        <select onChange={(e) => this.setState({ campusId: e.target.value })}>
                            {this.props.campuses.map(campus => {
                                return <option value={campus.id} key={campus.id}>{campus.name}</option>
                            })}
                        </select>
                        <button type="submit">Add Student</button>
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
            console.log('from post', { name, email, campusId, event })
            event.preventDefault();
            dispatch(addNewStudent({ name, email, campusId }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewStudent); 