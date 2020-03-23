import React from 'react'
import moment from 'moment'

const CourseSummary = ({course}) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{course.title}</span>
                <p>{course.description}</p>
                <p>Created by {course.authorFirstName} {course.authorLastName}</p>
                <p className="grey-text">{moment(course.createdAt.toDate().toString()).calendar()}</p>
            </div>
        </div>
    )
}

export default CourseSummary