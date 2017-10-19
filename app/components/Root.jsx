import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux'
import  {fetchStudents, fetchCampuses} from "../reducers";
import CampusList from './CampusList'
import StudentList from './StudentList'
import Student from './Student'
import Home from './Home'
import Navbar from './Navbar'
import Campus from './Campus'
import UpdateCampus from './UpdateCampus'

class Root extends Component {

    componentDidMount() {
        this.props.fetchStudents(); 
        this.props.fetchCampuses(); 
    }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/campuses" component={CampusList} />
                    <Route exact path="/students" component={StudentList} />
                    <Route exact path="/students/:studentId" component={Student} />
                    <Route exact path="/campuses/:campusId" component={Campus} />
                    <Route path="/campuses/update/:campusId" component={UpdateCampus} />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => dispatch(fetchStudents()), 
        fetchCampuses: () => dispatch(fetchCampuses())
    }
}

export default withRouter(connect(
    null, 
    mapDispatchToProps
)(Root)); 

