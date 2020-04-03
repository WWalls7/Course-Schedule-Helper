import React from 'react'
import moment from 'moment'

const Requests = (props) => {
    const {notifications} = props;
    return (
        <div className="section">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Open Requests</span>
                    <ul className="notifications">
                        {notifications && notifications.map( notification => {
                            return(
                                <li key={notification.id}>
                                    <span className="blue-text">Trainer: {notification.request.trainerRequesting} </span>
                                    <div class="grey-text note-date">
                                        Trainer ID: {notification.request.trainerId}
                                    </div>
                                    <span>{notification.content}</span>
                                    <div class="grey-text note-date">
                                        {moment(notification.createdAt.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Requests
