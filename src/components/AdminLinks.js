import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import { signOut } from '../store/authActions';

const AdminLinks = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/signup'>Add New User</NavLink></li>
            <li><NavLink to='/contact'>Contact Information</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/profile' className='btn btn-floating red lighten-1'>
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

export default connect(null, mapDispatchToProps)(AdminLinks)