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
        case 'ADD_TRAINER':
            console.log('added new trainer', action.course);
            return state;
        case 'ADD_TRAINER_ERROR':
            console.log('error adding new trainer', action.err);
            return state;
        case 'REMOVE_TRAINER':
            console.log('removed trainer', action.course);
            return state;
        case 'REMOVE_TRAINER_ERROR':
            console.log('error removing trainer', action.err);
            return state;
        default:
            return state;
    }
}

export default courseReducer