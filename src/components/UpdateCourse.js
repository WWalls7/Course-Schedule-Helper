import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateCourse} from '../store/courseActions'
import {Redirect} from 'react-router-dom'

class UpdateCourse extends Component {
    state = {
        id: this.props.location.state.course.id,
        title: this.props.location.state.course.title,
        description: this.props.location.state.course.description,
        startDate: this.props.location.state.startDate,
        startTime: this.props.location.state.startTime,
        endDate: this.props.location.state.endDate,
        endTime: this.props.location.state.endTime,
        frequency: this.props.location.state.course.frequency,
        skills: this.props.location.state.course.skills,
        trainers: this.props.location.state.course.trainers,
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value  
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateCourse(this.state)
        this.props.history.push('/')
    }

    addTrainer = () => {
        this.props.history.push({
            pathname: '/addTrainer',
            state: {
              course: this.state
            }
          })
    }
    removeTrainer = () => {
        this.props.history.push('/removetrainer')
    }

    render() {
        console.log(this.props.location.state.course)
        const {auth, users, courses} = this.props;
        const course = this.props.location.state.course
        console.log(courses)
        

        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Title: {this.state.title}</span>
                    <p>Description: {this.state.description}</p>
                    <p>Frequency: {this.state.frequency}</p><br/>
                    <p>Start Date: {course.startDate+" "+course.startTime}</p>
                    <p>End Date: {course.endDate+" "+course.endTime}</p><br/>
                    <p>Created by: {course.author}</p><br/>
                    <strong>To change the date, time, or trainers, click 'Add a Trainer' or 'Remove a Trainer'</strong>
                    <div className="input-field">
                        <button className="btn blue lighten-1" onClick={this.addTrainer}>Add a Trainer</button>
                        <button className="btn blue lighten-1" onClick={this.removeTrainer}>Remove a Trainer</button>
                    </div>
                </div>
            </div>
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Course</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title: {course.title}</label>
                        <input type="text" id="title"  onChange={this.handleChange} required/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="description">Description: {course.description}</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="frequency">Frequency: {course.frequency}</label>
                        <input type="number" id="frequency" name="quantity" min="1" onChange={this.handleChange} required></input>
                    </div>

                    <div className="input-field">
                        <button className="btn blue lighten-1">Update</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        users: state.firestore.ordered.users, 
        courses: state.firestore.ordered.courses
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateCourse: (course) => dispatch(updateCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCourse)
