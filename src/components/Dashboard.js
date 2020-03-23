import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import Cal from './Cal'

class Dashboard extends Component {
    checkUser = (profile) => {
        if(profile.userType === "trainer"){
            return "trainer"
        }
        else{
            return "scheduler"
        }
    }
    render() {
        const {courses, auth, users, profile} = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        if (profile && this.checkUser(profile) === 'trainer') return <Redirect to='/trainer' />
        return (
            <div className="dashboard container">
                <Cal courses={courses} history={this.props.history} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.firestore)
    return{
        courses: state.firestore.ordered.courses,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        profile: state.firebase.profile,

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'courses', orderBy: ['createdAt', 'desc']},
        {collection: 'users'}
    ])
)(Dashboard)
