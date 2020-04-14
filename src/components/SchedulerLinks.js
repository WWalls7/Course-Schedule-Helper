import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import { signOut } from '../store/authActions';

const SchedulerLinks = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/create'>Create Course</NavLink></li>
            <li><NavLink to='/updates'>View Requests</NavLink></li>
            <li><NavLink to='/contact'>Contact Information</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/profile' className='btn btn-floating green lighten-1'>
            {props.profile.initials}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SchedulerLinks)