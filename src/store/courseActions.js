export const createCourse = (course) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to DB
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('courses').add({
            ...course,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_COURSE', course });
        }).catch((err) => {
            dispatch({ type: 'CREATE_COURSE_ERROR', err}); 
        })
    }
};

export const updateCourse = (course) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to DB
        const firestore = getFirestore();
        firestore.collection('courses').doc(course.id).update({
            title: course.title,
            description: course.description,
            frequency: course.frequency
        }).then(() => {
            dispatch({ type: 'UPDATE_COURSE', course });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_COURSE_ERROR', err}); 
        })
    }
};

export const addTrainer = (course) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to DB
        const firestore = getFirestore();
        firestore.collection('courses').doc(course.id).update({
            title: course.title,
            description: course.description,
            frequency: course.frequency
        }).then(() => {
            dispatch({ type: 'UPDATE_COURSE', course });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_COURSE_ERROR', err}); 
        })
    }
};

export const removeTrainer = (course) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to DB
        const firestore = getFirestore();
        firestore.collection('courses').doc(course.id).update({
            title: course.title,
            description: course.description,
            frequency: course.frequency
        }).then(() => {
            dispatch({ type: 'UPDATE_COURSE', course });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_COURSE_ERROR', err}); 
        })
    }
};