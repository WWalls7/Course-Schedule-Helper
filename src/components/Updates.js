import React, { Component } from 'react'
import Notifications from './Notifications'
import CourseList from './CourseList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

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
        const {courses, auth, notifications, profile} = this.props;
        console.log(auth)
        if (!auth.uid) return <Redirect to='/signin' />
        if (profile && this.checkUser(profile) === 'trainer') return <Redirect to='/trainer' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <CourseList courses={courses} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        courses: state.firestore.ordered.courses,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'courses', orderBy: ['createdAt', 'desc']},
        {collection: 'notifications', orderBy: ['time', 'desc']},
        {collection: 'users'}
    ])
)(Dashboard)
