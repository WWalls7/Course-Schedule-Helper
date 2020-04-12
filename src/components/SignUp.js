import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../store/authActions'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userType: '', 
        skills: [],
        skill: '',
        skillLvl: 0,
        phoneNo: '',
        isTrainer: false,
        message: '',
        successMessage: ''
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value  
        })
        if(e.target.id === "userType" && e.target.value === "trainer"){
            this.setState({
                isTrainer: true
            })
        }
        else if(e.target.id === "userType" && e.target.value !== "trainer"){
            this.setState({
                isTrainer: false
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.userType === "trainer"){
            if(this.state.skills.length === 0){
                this.setState({
                    successMessage: "You must have at least 1 skill to create a new trainer."
                })
                return
            }
            var trainerState = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userType: this.state.userType,
                skills: this.state.skills,
                phoneNo: this.state.phoneNo
            }
            this.props.signUp(trainerState)
        }
        else{
            var schedulerState = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userType: this.state.userType,
                phoneNo: this.state.phoneNo
            }
            this.props.signUp(schedulerState)
        }
        this.setState({
            successMessage: "You have successfully created a new user. Make sure to save the login details."
        })
    }
    addSkill = (e) => {
        if(this.state.skill === '' || this.state.skillLvl === 0 || this.state.skillLvl === ''){
            this.setState({
                message: "You must enter a skill type and skill level to add a skill"
            })
            return
        }
        else if(this.state.skillLvl < 1 || this.state.skillLvl > 4){
            this.setState({
                message: "You must enter a skill level from 1 to 4"
            })
            return
        }
        var skill = {skill: this.state.skill, skillLvl: this.state.skillLvl}
        if(this.state.skills.length === 0){
            this.setState({
                skills: [skill],
                message: "Skill added successfully.",
                skill: ''
            })
        }
        else{
            this.setState({
                skills: [...this.state.skills, skill],
                message: "Skill added successfully.",
                skill: ''
            })
        }
    }
    render() {
        const {authError, profile} = this.props;
        if (profile.userType === 'trainer') return <Redirect to='/trainer' />
        if (profile.userType === 'scheduler') return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">New User Details</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phoneNo">Phone Number (ex: 12345 123456)</label>
                        <input type="text" id="phoneNo" pattern="[0-9]{5} [0-9]{6}" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label>User Type</label><br/><br/>
                        <select id="userType" className="browser-default" onChange={this.handleChange} required>
                            <option value="" disabled selected>Choose your user type</option>
                            <option value="scheduler">Scheduler</option>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    
                    {this.state.isTrainer &&
                        <div className="input-field">
                            <h5 className="grey-text text-darken-3">Add a Skill</h5>

                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Currently Registered Skills</span>
                                        {this.state.skills && this.state.skills.map(skill => {
                                            return (
                                                <p>Skill: {skill.skill} - Skill Level: {skill.skillLvl}</p>
                                            )
                                        })}
                                </div>
                            </div>
                    
                            <div className="input-field">
                                <label htmlFor="skill">Skill Name</label>
                                <input type="text" id="skill" onChange={this.handleChange} />
                            </div>
                    
                            <div className="input-field">
                                <label htmlFor="skillLvl">Skill Level</label>
                                <input type="number" id="skillLvl" onChange={this.handleChange}></input>
                            </div>
                    
                            {this.state.message !== '' &&
                                <strong className="red-text">{this.state.message}</strong>
                            }
                            
                            <div className="input-field">
                                <button type="button" className="btn green lighten-1" onClick={this.addSkill} >Add Skill</button>
                            </div>
                        </div>
                    }
                    {this.state.successMessage !== '' &&
                        <strong className="red-text">{this.state.successMessage}</strong>
                    }
                    <div className="input-field">
                        <button className="btn blue lighten-1">Create User</button>
                        <div className="center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
