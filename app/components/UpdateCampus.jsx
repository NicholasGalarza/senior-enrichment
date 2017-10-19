import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {addNewCampus} from '../reducers';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'; 


class UpdateCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            image: "",
        }

    }
    render() {
        const {addNew, handleChange, handleSubmit} = this.props; 

        return (
            <div className="campus-form">
                <h1>Make Edits to Campus</h1>
                <form onSubmit={(e) => handleSubmit(this.state.name, this.state.image, e)} id="new-campus-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({name: e.target.value})}
                            value={this.state.name}
                            placeholder="update campus name..."
                        />
                        <input type="text"
                            name = "image"
                            value={this.state.image}
                            onChange={(e) => this.setState({image: e.target.value})}
                            placeholder="change image url..."
                        />
                        <button type="submit">Add Campus</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        newCampus: state.name, 
        image: state.image
    };
};

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit(newCampus, image, event) {
            event.preventDefault(); 
            dispatch(addNewCampus({newCampus, image})); 
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateCampus); 