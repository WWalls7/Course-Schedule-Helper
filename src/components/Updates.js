import React, { Component } from 'react'
import Notifications from './Notifications'
import CourseList from './CourseList'
import Requests from './Requests'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class Updates extends Component {
    // checkUser = (profile) => {
    //     if(profile.userType === "trainer"){
    //         return "trainer"
    //     }
    //     else{
    //         return "scheduler"
    //     }
    // }
    courseNotifications = (notifications) => {
        var courseNotifs = []
        notifications && notifications.forEach(notif => {
            if(notif.type === "course"){
                courseNotifs.push(notif)
            }
        });
        return courseNotifs
    }
    requestNotifications = (notifications) => {
        var requestNotifs = []
        notifications && notifications.forEach(notif => {
            if(notif.type === "request"){
                requestNotifs.push(notif)
            }
        });
        return requestNotifs
    }
    render() {
        const {courses, auth, notifications, profile} = this.props;
        var courseNotifications = this.courseNotifications(notifications)
        var requestNotifications = this.requestNotifications(notifications)
        console.log(requestNotifications)
        if (!auth.uid) return <Redirect to='/signin' />
        if (profile.userType === 'trainer') return <Redirect to='/trainer' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <Requests notifications={requestNotifications}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={courseNotifications}/>
                        <CourseList courses={courses} />
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
        {collection: 'notifications'},
        {collection: 'users'}
    ])
)(Updates)
