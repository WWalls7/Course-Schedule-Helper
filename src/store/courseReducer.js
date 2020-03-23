const initState = {
}

const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_COURSE':
            console.log('created course', action.course);
            return state;
        case 'CREATE_COURSE_ERROR':
            console.log('create course error', action.err);
            return state;
        case 'UPDATE_COURSE':
            console.log('updated course', action.course);
            return state;
        case 'UPDATE_COURSE_ERROR':
            console.log('update course error', action.err);
            return state;
        default:
            return state;
    }
}

export default courseReducer