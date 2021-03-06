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

    getStudent(id) {
        return this.props.students.find(student => student.id === +id);
    }

    getCampus(id) {
        return this.props.campuses.find(campus => campus.id === +id);
    }

    render() {
        return (
            <div>
                <Navbar />
                {/* <Route exact path="/conceptions/:id" render={({ match }) => <Conception match={match} {...this.props} />}/> */}
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/campuses" component={CampusList} />
                        <Route exact path="/students" component={StudentList} />
                        <Route exact path="/students/add" component={NewStudent} />
                        <Route exact path="/campuses/add" component={NewCampus} />
                        <Route exact path="/students/:studentId" component={Student} />
                        <Route exact path="/campuses/:campusId" component={Campus} />
                        <Route exact path="/campuses/update/:campusId"
                            render={({ match }) => (
                                <UpdateCampus
                                    campus={this.getCampus(match.params.campusId)}
                                    match={match} {...this.props}
                                    id={match.params.campusId} />
                            )} />
                        <Route exact path="/students/update/:studentId"
                            render={({ match }) => (
                                <UpdateStudent
                                    student={this.getStudent(match.params.studentId)}
                                    match={match} {...this.props}
                                    id={match.params.studentId} />
                            )} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students,
        campuses: state.campuses
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => dispatch(fetchStudents()),
        fetchCampuses: () => dispatch(fetchCampuses())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Root));

// {/* <Route exact path="/students/update/:studentId" component={UpdateStudent} /> */}
// {/* https://reacttraining.com/react-router/web/api/match */}