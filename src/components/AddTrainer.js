import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addTrainer} from '../store/courseActions'
import {Redirect} from 'react-router-dom'

class AddTrainer extends Component {
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
        selected: false,
        trainer: false
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value  
        })
        if(e.target.id === "skills"){
            this.setState({
                selected: true
            })
        }
        if(e.target.id === "trainers"){
            this.setState({
                trainer: true
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTrainer(this.state)
        this.props.history.push('/')
    }
    getDate = () => {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + "-" + month + "-" + day;       
        return today;
    }
    getTrainers = (users) =>{
        var trainers = []
        users && users.forEach(user => {
            if(user.userType === "trainer" && !this.state.trainers.includes(user)){
                trainers.push(user)
            }
        })
        return trainers
    }
    skills = (trainers) => {
        var skills =[]
        trainers && trainers.forEach(trainer => {
            trainer.skills && trainer.skills.forEach(skill => {
                if(!skills.includes(skill.skill)){
                    skills.push(skill.skill)
                }
            });
        });
        return skills
    }
    trainersWithSkill = (skill, trainers) => {
        var trainersWithSkill =[]
        trainers.forEach(trainer => {
            trainer.skills && trainer.skills.forEach(trainerSkill => {
                if(skill === trainerSkill.skill && !trainersWithSkill.includes(trainer)){
                    trainersWithSkill.push(trainer)
                }
            });
        });
        return trainersWithSkill
    }
    getBlockedTimes = (trainer, courses) => {
        var times =[]
        courses && courses.forEach(course => {
            if(course.trainers === trainer){
                times.push(course.startDate + " at " + course.startTime + " to " +
                course.endDate + " at " + course.endTime)
            }
        });
        return times
    }

    render() {
        console.log(this.props)
        const {auth, users, courses} = this.props;
        const course = this.props.location.state.course
        console.log(users)
        

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
                    <p>Assigned Trainers: </p>
                    <p>Created by: {course.author}</p><br/>
                </div>
            </div>
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add Trainer</h5>
                    
                    <div className="input-field">
                        <label>Choose a Skill</label><br/><br/>
                        <select id="skills" className="browser-default" onChange={this.handleChange} required>
                            <option value='' disabled selected></option>
                            {this.skills(this.getTrainers(users)).map(skill => {
                                return (
                                    <option value={skill}>{skill}</option>
                                )
                            })}
                        </select>
                    </div>

                    {this.state.selected &&
                        <div className="input-field">
                            <label>Choose a Trainer</label><br/><br/>
                            <select id="trainers" className="browser-default" onChange={this.handleChange} required>
                                <option value='' disabled selected></option>
                                {this.trainersWithSkill(this.state.skills, this.getTrainers(users)).map(trainer => {
                                    return (
                                        <option value={trainer.id}>{trainer.firstName + " " + trainer.lastName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    }

                    {this.state.trainer &&
                        <>
                        <div className="input-field">
                            <h5 className="grey-text text-darken-3">Choose a Time</h5>
                            <p>This trainer is unavailable during these times:</p>
                            <ul>
                                {this.getBlockedTimes(this.state.trainers, courses).map(time => {
                                    return (
                                        <li>{time}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="input-field">
                        <label htmlFor="startDate">Start date</label><br/><br/>
                        <input type="date" id="startDate" min={this.getDate()}
                            onChange={this.handleChange} required></input> 
                        </div>

                        <div className="input-field">
                            <label htmlFor="startTime">Start Time (ex: 14:30)</label>
                            <input type="text" id="startTime" onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endDate">End date</label><br/><br/>
                            <input type="date" id="endDate" min={this.getDate()}
                                onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endTime">End Time (ex: 15:30)</label>
                            <input type="text" id="endTime" onChange={this.handleChange} required></input>
                        </div></>

                    }

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
        addTrainer: (course) => dispatch(addTrainer(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrainer)
