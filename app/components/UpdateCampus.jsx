import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { updateCampusData } from '../reducers';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';



class UpdateCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            image: "",
            launchRedirect: false
        }
    }

    render() {
        const { handleChange, handleSubmit } = this.props;
        return (
            <div className="campus-form">
                <h1>Make Edits to Campus</h1>
                <form onSubmit={(e) => { handleSubmit(this.state.name, this.state.image, e), this.setState({ launchRedirect: true }) }} id="new-campus-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({ name: e.target.value })}
                            value={this.state.name}
                            placeholder="update campus name..."
                        />
                        <input type="text"
                            name="image"
                            value={this.state.image}
                            onChange={(e) => this.setState({ image: e.target.value })}
                            placeholder="change image url..."
                        />
                        <button type="submit">Submit Changes</button>
                    </div>
                </form>
                {this.state.lauchRedirect && (
                    <Redirect to={`/campuses`} />
                )}
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        name: state.name,
        image: state.image
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {

    return {
        handleSubmit(name, image, event) {
            event.preventDefault();
            const id = ownProps.match.params.campusId;
            dispatch(updateCampusData(id, { name, image }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateCampus); 