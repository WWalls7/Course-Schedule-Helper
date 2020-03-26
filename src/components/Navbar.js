import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SchedulerLinks from './SchedulerLinks';
import TrainerLinks from './TrainerLinks';
import SignedOut from './SignedOut';
import {connect} from 'react-redux'

class Navbar extends Component {
    checkUser = (auth, profile) => {
        if(auth.uid && profile.userType === "scheduler"){
            return <SchedulerLinks profile={profile}/>
        }
        else if(auth.uid && profile.userType === "trainer") {
            return <TrainerLinks profile={profile}/>
        }
        else{
            return <SignedOut />
        }
    }
    render(){
        const {auth, profile} = this.props;
        const links = this.checkUser(auth, profile)
        console.log(profile)
        console.log(auth)
        return(
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <Link to='/' className="brand-logo">App</Link>
                    {auth.isLoaded && links}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)