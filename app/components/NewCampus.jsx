import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {addNewCampus} from '../reducers';
import { Route, Switch, NavLink } from 'react-router-dom'; 
import { Redirect } from 'react-router'; 


class NewCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            image: "",
            lauchRedirect: false 
        }
    }
    
    render() {
        const {handleChange, handleSubmit} = this.props; 

        return (
            <div className="addition-form">
                <h1>Add New Campus</h1>
                <form onSubmit={(e) => {handleSubmit(this.state.name, this.state.image, e), this.setState({lauchRedirect: true})}} id="new-campus-form">
                    <div>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => this.setState({name: e.target.value})}
                            value={this.state.name}
                            placeholder="enter campus name..."
                        />
                        <input type="text"
                            name = "image"
                            value={this.state.image}
                            onChange={(e) => this.setState({image: e.target.value})}
                            placeholder="insert image url..."
                        />
                        <button type="submit">Add Campus</button>
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
)(NewCampus); 