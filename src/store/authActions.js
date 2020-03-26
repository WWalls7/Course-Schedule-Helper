export const signIn = (credentials) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email, 
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            if (newUser.userType === "trainer"){
                return firestore.collection('users').doc(resp.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    userType: newUser.userType,
                    skills: newUser.skills,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo
                })
            }
            else {
                return firestore.collection('users').doc(resp.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    userType: newUser.userType,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo
                })
            }
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}

export const updateProfile = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userInfo = ''
        if (user.userType === "trainer"){
            userInfo = {firstName: user.firstName,
            lastName: user.lastName,
            skills: user.skills,
            phoneNo: user.phoneNo}
        }
        else {
            userInfo= {firstName: user.firstName,
            lastName: user.lastName,
            phoneNo: user.phoneNo}
        }
        firestore.collection('users').doc(user.id).update({
            userInfo
        }).then(() => {
            dispatch({ type: 'UPDATE_PROFILE'});
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err}); 
        })
    }
}
