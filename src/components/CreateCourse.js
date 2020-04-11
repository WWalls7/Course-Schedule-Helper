import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCourse, addNotification} from '../store/courseActions'
import {Redirect} from 'react-router-dom'
import '../styles/form.css'
import Cal from './Cal'
import moment from 'moment';

class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        frequency: 0,
        trainers: '',
        skills: '',
        selected: false,
        trainer: false,
        message: ''
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
        var start = Date.parse(this.state.startDate+" "+this.state.startTime)
        var end = Date.parse(this.state.endDate+" "+this.state.endTime)
        var assignedCourses = this.getCourses(this.state.trainers, this.props.courses)
        var set = false
        if(!moment(this.state.endDate+" "+this.state.endTime).isAfter(this.state.startDate+" "+this.state.startTime)){
            this.setState({
                message: "The end time must be after the start time"
            })
            set = true
            return
        }
        assignedCourses.forEach(course => {
            var blockedStart = Date.parse(course.startDate+" "+course.startTime)
            var blockedEnd = Date.parse(course.endDate+" "+course.endTime)
            if((start >= blockedStart && start <= blockedEnd)||(end >= blockedStart && end <= blockedEnd)){
                this.setState({
                    message: "The date you have entered is unavailable for the selected trainer. Try again."
                })
                set = true
            }
        })
        if(!set){
            this.props.addNotification("You have been added to a new course", this.state)
            this.props.createCourse(this.state)
            this.props.history.push('/')
        }
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
            if(user.userType === "trainer"){
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
    getCourses = (trainer, courses) =>{
        var trainerCourses = []
        courses && courses.forEach(course => {
            if(course.trainers.includes(trainer)){
                trainerCourses.push(course)
            }
        })
        
        return trainerCourses
    }
    render() {
        const {auth, users, courses, profile} = this.props;
        const trainers = this.getTrainers(users)
        const skills = this.skills(trainers)  
        if (!auth.uid) return <Redirect to='/signin' />
        if (profile.userType === 'trainer') return <Redirect to='/trainer' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Course</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="frequency">Frequency</label>
                        <input type="number" id="frequency" name="quantity" min="1" onChange={this.handleChange} required></input>
                    </div>

                    <div className="input-field">
                        <label>Choose a Skill</label><br/><br/>
                        <select id="skills" className="browser-default" onChange={this.handleChange} required>
                            <option value='' disabled selected></option>
                            {skills.map(skill => {
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
                            <div className="card">
                                <div className="card-content">
                                    <Cal courses={this.getCourses(this.state.trainers, courses)} trainers={trainers} history={this.props.history}/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                        <label htmlFor="startDate">Start date</label><br/><br/>
                        <input type="date" id="startDate" min={this.getDate()}
                            onChange={this.handleChange} required></input> 
                        </div>

                        <div className="input-field">
                            <label htmlFor="startTime">Start Time (ex: 14:30)</label>
                            <input type="text" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" id="startTime" onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endDate">End date</label><br/><br/>
                            <input type="date" id="endDate" min={this.state.startDate}
                                onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endTime">End Time (after start time)</label>
                            <input type="text" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" id="endTime" onChange={this.handleChange} required></input>
                        </div></>

                    }

                    {this.state.message !== '' &&
                        <strong className="red-text">{this.state.message}</strong>
                    }

                    <div className="input-field">
                        <button className="btn blue lighten-1">Create</button>
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
        courses: state.firestore.ordered.courses,
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createCourse: (course) => dispatch(createCourse(course)),
        addNotification: (notification, course) => dispatch(addNotification(notification, course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse)
