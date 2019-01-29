import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import CourseGrid from './CourseGrid'
import CourseTable from './CourseTable'
import CourseService from '../services/CourseService'
import CourseEditor from "../components/CourseEditor";
import HomePage from "../styling/HomePage.css";

class WhiteBoard extends Component {
    constructor() {
        super();
        this.courseService = new CourseService()
        this.state = {
            course: {title: '', id: ''},
            courses: this.courseService.findAllCourses()
        }

        this.titleChanged = this.titleChanged.bind(this);
    }

    deleteCourse = course =>
        this.setState({
            courses: this.courseService.deleteCourse(course)
        })
    addCourse = () =>
        this.setState({
            courses: this.courseService.addCourse(this.state.course)
        })

    titleChanged = (event) =>
        this.setState(
            {
                course: {title: event.target.value, id: (new Date()).getTime()}
            });

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <a className="navbar-brand" href="#">Course Manager</a>
                        <ul className="navbar-nav">
                            <li className="nav-item"></li>
                            <li className="nav-item"></li>
                        </ul>
                    </div>
                    <label htmlFor="newCourseTitleFld"></label> <input
                    className="form-control col-8" type="text" id="newCourseTitleFld"
                    placeholder="New Course Title" onChange={this.titleChanged}/>
                    <button className="btn btn-primary btn-circle" value="ADDCOURSEBTN"
                            id="add" onClick={this.addCourse}>
                        <i className="fa fa-plus"></i>
                    </button>
                </nav>
                <Router>
                    <div>
                        <Link to="/">Course Grid</Link>
                        <Link to="/table">Course Table</Link>
                        <Route path='/' exact
                               render={() =>
                                   <CourseGrid
                                       addCourse={this.addCourse}
                                       deleteCourse={this.deleteCourse}
                                       courses={this.state.courses}/>}/>
                        <Route path="/course/:id"
                               exact
                               component={CourseEditor}/>
                        <Route path='/table' exact
                               render={() =>
                                   <CourseTable
                                       courses={this.state.courses}
                                       deleteCourse={this.deleteCourse}/>}/>
                    </div>
                </Router>
                <button className="btn btn-primary btn-circle shadow "
                        value="FIXEDADDCOURSEBTN" id="fixedAdd" onClick={this.addCourse}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        )
    }
}

export default WhiteBoard;