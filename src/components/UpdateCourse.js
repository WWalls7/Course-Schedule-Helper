import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateCourse} from '../store/courseActions'
import {Redirect} from 'react-router-dom'

class UpdateCourse extends Component {
    state = {
        id: this.props.location.state.course.id,
        title: this.props.location.state.course.title,
        description: this.props.location.state.course.description,
        startDate: this.props.location.state.course.startDate,
        startTime: this.props.location.state.course.startTime,
        endDate: this.props.location.state.course.endDate,
        endTime: this.props.location.state.course.endTime,
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
    getTrainers = (users) =>{
        var trainers = []
        users && users.forEach(user => {
            if(user.userType === "trainer"){
                trainers.push(user)
            }
        })
        return trainers
    }
    getAssignedTrainers(trainers, currentTrainers){
        var assigned = []
        currentTrainers.forEach(id => {
            for(var i=0; i< trainers.length; i++){
                if (trainers[i].id === id){assigned.push(trainers[i])}
            }
        });
        return assigned
    }
    render() {
        console.log(this.props.location.state.course)
        const {auth, users, courses} = this.props;
        const course = this.props.location.state.course
        console.log(course)
        const trainers = this.getTrainers(users) 
        const currentTrainers = this.getAssignedTrainers(trainers, this.state.trainers)
        

        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
            <div className="card">
            <div className="card-content">
                    <span className="card-title">Title: {this.state.title}</span>
                    <p>Description: {this.state.description}</p>
                    <p>Frequency: {this.state.frequency}</p><br/>
                    <p>Start: {this.state.startDate+" "+this.state.startTime}</p>
                    <p>End: {this.state.endDate+" "+this.state.endTime}</p><br/>
                    <p>Assigned Trainers: </p>
                    {currentTrainers && currentTrainers.map(trainer => {
                        return(
                            <p>{trainer.firstName + " " + trainer.lastName}</p>
                        )
                    })}<br/>
                    <p>Created by: {course.author}</p><br/>
                </div>
            </div>
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Course</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title: {course.title}</label>
                        <input type="text" id="title"  onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="description">Description: {course.description}</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="frequency">Frequency: {course.frequency}</label>
                        <input type="number" id="frequency" name="quantity" min="1" onChange={this.handleChange}></input>
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
