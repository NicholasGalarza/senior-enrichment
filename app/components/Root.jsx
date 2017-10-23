import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux'
import { fetchStudents, fetchCampuses } from "../reducers";
import CampusList from './CampusList'
import StudentList from './StudentList'
import Student from './Student'
import Home from './Home'
import Navbar from './Navbar'
import Campus from './Campus'
import UpdateCampus from './UpdateCampus'
import UpdateStudent from './UpdateStudent'
import NewStudent from './NewStudent'
import NewCampus from './NewCampus'


class Root extends Component {

    componentDidMount() {
        this.props.fetchStudents();
        this.props.fetchCampuses();
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/campuses" component={CampusList} />
                        <Route exact path="/students" component={StudentList} />
                        <Route exact path="/students/add" component={NewStudent} />
                        <Route exact path="/campuses/add" component={NewCampus} />
                        <Route exact path="/students/:studentId" component={Student} />
                        <Route exact path="/campuses/:campusId" component={Campus} />
                        <Route exact path="/campuses/update/:campusId" component={UpdateCampus} />
                        <Route exact path="/students/update/:studentId" component={UpdateStudent} />
                    </Switch>
                </div>
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

