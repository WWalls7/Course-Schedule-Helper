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
        isTrainer: false
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
        if(e.target.id === "userType" && e.target.value !== "trainer"){
            this.setState({
                isTrainer: false
            })
        }
    }
    addSkill = (e) => {
        var skill = {skill: this.state.skill, skillLvl: this.state.skillLvl}
        if(this.state.skills.length === 0){
            this.setState({
                skills: [skill]
            })
        }
        else{
            this.setState({
                skills: [...this.state.skills, skill]
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.userType === "trainer"){
            
            var trainerState = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userType: this.state.userType,
                skills: this.state.skills
            }
            this.props.signUp(trainerState)
        }
        else{
            var schedulerState = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userType: this.state.userType
            }
            this.props.signUp(schedulerState)
        }
        //this.props.history.push('/')
    }
    render() {
        const {auth, authError} = this.props;
        if (auth.uid && this.state.userType === "scheduler") return <Redirect to='/' />
        if (auth.uid && this.state.userType === "trainer") return <Redirect to='/trainer' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label>User Type</label><br/><br/>
                        <select id="userType" className="browser-default" onChange={this.handleChange}>
                            <option value="" disabled selected>Choose your user type</option>
                            <option value="scheduler">Scheduler</option>
                            <option value="trainer">Trainer</option>
                            {/* <option value="admin">Administrator</option> */}
                        </select>
                    </div>

                    
                    {this.state.isTrainer &&
                        <div className="input-field">
                            <h5 className="grey-text text-darken-3">Add a Skill</h5>

                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Currently Registered Skills</span>
                                    {this.state.skills && this.state.skills.forEach(skill => {
                                        return(<p>{skill}</p>)
                                    })}
                                </div>
                            </div>
                    
                            <div className="input-field">
                                <label htmlFor="skill">Skill Name</label>
                                <input type="text" id="skill" onChange={this.handleChange} required/>
                            </div>
                    
                            <div className="input-field">
                                <label htmlFor="skillLvl">Skill Level</label>
                                <input type="number" min="1" max ="4" id="skillLvl" onChange={this.handleChange} required></input>
                            </div>
                    
                            <div className="input-field">
                                <button type="button" className="btn green lighten-1" onClick={this.addSkill} >Add Skill</button>
                            </div>
                        </div>
                    }
                    

                    <div className="input-field">
                        <button className="btn blue lighten-1">Sign Up</button>
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
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
