import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteCourse} from '../store/courseActions'
import {Redirect} from 'react-router-dom'
import '../styles/form.css'

class Delete extends Component {
    state = {
        id: this.props.location.state.course.id,
        title: this.props.location.state.course.title,
        description: this.props.location.state.course.description,
        startDate: this.props.location.state.course.startDate,
        startTime: this.props.location.state.course.startTime,
        endDate: this.props.location.state.course.endDate,
        endTime: this.props.location.state.course.endTime,
        frequency: this.props.location.state.course.frequency,
        trainers: this.props.location.state.course.trainers,
        author: this.props.location.state.course.authorFirstName+" "+this.props.location.state.course.authorLastName
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.deleteCourse(this.state)
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
        const {auth, users} = this.props;
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
                    <p>Created by: {this.state.author}</p><br/>
                </div>
                
            </div>
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add Trainer</h5>
                    <div className="input-field">
                        <button className="btn blue lighten-1">Delete Course</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteCourse: (course) => dispatch(deleteCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)