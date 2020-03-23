import React, { Component } from 'react'
import CourseSummary from './CourseSummary'

const CourseList = ({courses}) => {
    return (
        <div className="course-list section">
            {courses && courses.map(course => {
                return (
                    <CourseSummary course={course} key={course.id}/>
                )
            })}
        </div>
    )
}

export default CourseList
