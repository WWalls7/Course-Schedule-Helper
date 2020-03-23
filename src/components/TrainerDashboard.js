import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import Cal from './Cal'

class TrainerDashboard extends Component {
    getCourses = (courses, auth) =>{
        var trainerCourses = []
        courses && courses.forEach(course => {
            if(course.trainers === auth.uid){
                trainerCourses.push(course)
            }
        })
        return trainerCourses
    }
    render() {
        const {courses, auth} = this.props;
        var trainerCourses = this.getCourses(courses, auth)
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                <Cal courses={trainerCourses} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        courses: state.firestore.ordered.courses,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'courses', orderBy: ['createdAt', 'desc']}
    ])
)(TrainerDashboard)
