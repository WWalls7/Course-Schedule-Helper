import React, { Component } from 'react'
import {connect} from 'react-redux'
import {removeTrainer} from '../store/courseActions'
import {Redirect} from 'react-router-dom'

class RemoveTrainer extends Component {
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
        trainer: ''
       // removable: false
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value, 
          removable: true
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
       // if(this.state.removable){
            this.props.removeTrainer(this.state)
            this.props.history.push('/')
       // }
        // else{
        //     console.log("buster")
        //     this.props.history.push('/addtrainer')
        //     // this.props.history.push({pathname: '/addtrainer', state: {course: this.state}})
        // }
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
    getRemovable(currentTrainers){
        console.log(currentTrainers.length)
        if(currentTrainers.length === 1 || currentTrainers.length === 0){
            return 'You must have at least two trainers to remove'
        }
        else{
            return ''
        }
    }
    redirect(e, course){
        // const course = this.state
        return(<Redirect to={{
            pathname: '/addtrainer',
            state: { course: course}
            }}
        />)
    }
    render() {
        const {auth, users, courses} = this.props;
        const course = this.props.location.state.course
        const trainers = this.getTrainers(users) 
        const currentTrainers = this.getAssignedTrainers(trainers, this.state.trainers)
        const removable = this.getRemovable(currentTrainers)
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
                    <h5 className="grey-text text-darken-3">Remove Trainer</h5>
                    <div className="input-field">
                        {removable === 'You must have at least two trainers to remove' &&
                        <p>{removable}</p>}
                    </div>
                    {removable === '' &&
                    <div className="input-field">
                        <label>Choose a Trainer</label><br/><br/>
                        <select id="trainer" className="browser-default" onChange={this.handleChange} required>
                            <option value="" disabled selected>{removable}</option>
                            {currentTrainers.map(trainer => {
                                return (
                                    <option value={trainer.id}>{trainer.firstName + " " + trainer.lastName}</option>
                                )
                            })}
                        </select> 
                    </div>}

                    {/* {removable === 'You must have at least two trainers to remove' &&
                        <div className="input-field">
                            <button type="button" onClick={} className="btn blue lighten-1">Add Trainer</button>
                        </div>
                    } */}
                    {removable === '' &&
                        <div className="input-field">
                            <button className="btn blue lighten-1">Remove Trainer</button>
                        </div>
                    }
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
        removeTrainer: (course) => dispatch(removeTrainer(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTrainer)
