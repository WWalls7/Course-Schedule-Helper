import React, {Component} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import Modal from "react-bootstrap/Modal";
import{ Button }from 'react-bootstrap'
import '../styles/modal.css'

moment.locale('en-GB');
const localizer = momentLocalizer(moment)

const Cal =(props)=>{

  const handleSelect = (event) => {
    setModalShow(true)
    console.log(event)
    setEvent(event)

  }

  function update (course) {
    //setRedirect(true)
    props.history.push({
      pathname: '/updatecourse',
      state: {
        course: course
      }
    })
  }
  function add (course) {
    //setRedirect(true)
    props.history.push({
      pathname: '/addtrainer',
      state: {
        course: course
      }
    })
  }
  function remove (course) {
    //setRedirect(true)
    props.history.push({
      pathname: '/removetrainer',
      state: {
        course: course
      }
    })
  }

  function courseFormat () {
    var courses = props.courses
    console.log(courses)
    var formattedCourses = []
    var i = 0
    courses && courses.forEach(course => {
      formattedCourses[i] = {
        'id' : course.id,
        'authorFirstName' : course.authorFirstName,
        'authorLastName' : course.authorLastName,
        'authorId' : course.authorId,
        'createdAt' : course.createdAt,
        'title' : course.title,
        'start' : new Date(course.startDate + " " + course.startTime),
        'end' : new Date(course.endDate + " " + course.endTime),
        'description' : course.description,
        'frequency' : course.frequency,
        'author' : course.authorFirstName + " " + course.authorLastName,
        'startDate' : course.startDate,
        'startTime' : course.startTime,
        'endDate' : course.endDate,
        'endTime' : course.endTime,
        'skills' : course.skills,
        'trainers' : course.trainers
      }
      i++
    });
    return formattedCourses
  }
    const [modalShow, setModalShow] = React.useState(false);
    const [event, setEvent] = React.useState("");
    return(
      <React.Fragment>
      <div>
      <Calendar                
        localizer={localizer}
        events={courseFormat(props)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        step={30}
        defaultView='month'
        views={['month','week','day']}
        defaultDate={new Date()}
        onSelectEvent={(event)=>handleSelect(event)}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        course={event}
        onHide={() => setModalShow(false)}
      />
      </div>
    </React.Fragment>
      
    )

    function MyVerticallyCenteredModal (props) {
      var course = props.course
      return (
        <Modal
          className="modall"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Title: {course.title}</span>
                    <p>Description: {course.description}</p>
                    <p>Frequency: {course.frequency}</p><br/>
                    <p>Start: {course.startDate+" "+course.startTime}</p>
                    <p>End: {course.endDate+" "+course.endTime}</p><br/>
                    <p>Assigned Trainers: </p>
                    {/* {currentTrainers && currentTrainers.map(trainer => {
                        return(
                            <p>{trainer.firstName + " " + trainer.lastName}</p>
                        )
                    })}<br/> */}
                    <p>Created by: {course.author}</p><br/>
                </div>  
            </div>
          </Modal.Body>
          
          <div className="footer">
            <Button onClick={(event)=>remove(course)}>Remove Trainer</Button>
            <Button onClick={(event)=>add(course)}>Add Trainer</Button>
            <Button onClick={(event)=>update(course)}>Update Course</Button>
            <Button onClick={props.onHide}>Close</Button>
          </div>
          
        </Modal>
      );   
    }
}

export default Cal
