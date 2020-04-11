import React from 'react'
import CourseSummary from './CourseSummary'

const CourseList = ({courses}) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">Courses</span>
                {courses && courses.map(course => {
                    return (
                        <CourseSummary course={course} key={course.id}/>
                    )
                })}
            </div>
        </div>
        
    )
}

export default CourseList
