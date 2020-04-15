import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import { signOut } from '../store/authActions';
import '../styles/navLink.css';

const TrainerLinks = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/viewrequests' className='navLink'>View Sent Requests</NavLink></li>
            <li><NavLink to='/trainernotifications' className='navLink'>View Notifications</NavLink></li>
            <li><NavLink to='/contact' className='navLink'>Contact Information</NavLink></li>
            <li><a className='navLink' onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/profile' className='btn btn-floating blue lighten-1'>
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

export default connect(null, mapDispatchToProps)(TrainerLinks)
