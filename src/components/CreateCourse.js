import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createCourse} from '../store/courseActions'
import {Redirect} from 'react-router-dom'
import '../styles/form.css'

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
        trainer: false
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value  
        })
        console.log(e.target.value)
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
        this.props.createCourse(this.state)
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
    getBlockedTimes = (trainer, courses) => {
        var times =[]
        courses && courses.forEach(course => {
            if(course.trainers.includes(trainer)){
                times.push(course.startDate + " at " + course.startTime + " to " +
                course.endDate + " at " + course.endTime)
            }
        });
        return times
    }
    render() {
        const {auth, users, courses} = this.props;
        const trainers = this.getTrainers(users)
        const skills = this.skills(trainers)  
        if (!auth.uid) return <Redirect to='/signin' />
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
                            <input type="text" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" id="startTime" onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endDate">End date</label><br/><br/>
                            <input type="date" id="endDate" min={this.getDate()}
                                onChange={this.handleChange} required></input>
                        </div>

                        <div className="input-field">
                            <label htmlFor="endTime">End Time (ex: 15:30)</label>
                            <input type="text" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" id="endTime" onChange={this.handleChange} required></input>
                        </div></>

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
        courses: state.firestore.ordered.courses
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createCourse: (course) => dispatch(createCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse)
