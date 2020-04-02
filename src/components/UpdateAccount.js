import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store/authActions'
import {Redirect} from 'react-router-dom'
import '../styles/form.css'

class UpdateAccount extends Component {
    state = {
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        userType: this.props.profile.userType, 
        skills: this.props.profile.skills,
        skill: '',
        removedSkill: '',
        skillLvl: 0,
        phoneNo: this.props.profile.phoneNo,
        isTrainer: false
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value  
        })
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
    removeSkill = (e) => {
        var skill = this.state.removedSkill
        var skills = [...this.props.profile.skills]
        var index = -1
        for(var i=0; i< skills.length; i++){
            if(skills[i].skill === skill){
                index = i
            }
        }
        if (index !== -1) {
            skills.splice(index, 1);
        }
        this.setState({
            skills: skills
        })
        console.log(this.state.skills)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.userType === "trainer"){
            var trainerState = {
                userType: this.state.userType,
                id: this.props.auth.uid,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                skills: this.state.skills,
                phoneNo: this.state.phoneNo
            }
            this.props.updateProfile(trainerState)
        }
        else{
            var schedulerState = {
                userType: this.state.userType,
                id: this.props.auth.uid,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNo: this.state.phoneNo
            }
            this.props.updateProfile(schedulerState)
        }
        this.props.history.push('/profile')
    }

    render() {
        const {auth, profile} = this.props;
        const skills = this.state.skills
        console.log(this.state.skills)
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                 <div className="card">
                    <div className="card-content">
                        <h4 className="card-title">Your Profile</h4>
                        <span className="card-title">Name: {this.state.firstName+" "+this.state.lastName}</span>
                        <p>Email: {auth.email}</p>
                        <p>Phone Number: {this.state.phoneNo}</p>
                        <p>Account Type: {profile.userType}</p>
                        {profile.userType === "trainer" &&
                            <div><p>Skills: </p>
                                {profile.skills && profile.skills.map(skill => {
                                    return (
                                        <p>Skill: {skill.skill} - Skill Level: {skill.skillLvl}</p>
                                    )
                                })}
                            </div>}
                        <br/>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Account</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phoneNo">Phone Number (ex: 12345 123456)</label>
                        <input type="text" id="phoneNo" pattern="[0-9]{5} [0-9]{6}" onChange={this.handleChange}/>
                    </div>
                 
                    
                    {this.state.userType === "trainer" &&
                        <div className="input-field">
                            <h5 className="grey-text text-darken-3">Add a Skill</h5>
                            <div className="input-field">
                                <label htmlFor="skill">Skill Name</label>
                                <input type="text" id="skill" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="skillLvl">Skill Level</label>
                                <input type="number" min="1" max ="4" id="skillLvl" onChange={this.handleChange}></input>
                            </div>
                            <div className="input-field">
                                <button type="button" className="btn green lighten-1" onClick={this.addSkill} >Add Skill</button>
                            </div>

                        
                            <h5 className="grey-text text-darken-3">Remove a Skill</h5>
                            <div className="input-field">
                                <label>Skill Name</label><br/>
                                <select id="removedSkill" className="browser-default" onChange={this.handleChange} required>
                                    <option value='' disabled selected></option>
                                    {skills.map(skill => {
                                        return (
                                            <option value={skill.skill}>{skill.skill}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="input-field">
                                <button type="button" className="btn green lighten-1" onClick={this.removeSkill} >Remove Skill</button>
                            </div>
                        </div>
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
        profile: state.firebase.profile
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (user) => dispatch(updateProfile(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount)
