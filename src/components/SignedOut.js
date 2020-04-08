import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedOut = () => {
    return(
        <ul className="right">
            <li><NavLink to='/signin'>Sign In</NavLink></li>
        </ul>
    )
}

export default SignedOut;