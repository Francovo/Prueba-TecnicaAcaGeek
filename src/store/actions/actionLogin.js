import { FacebookAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { types } from "../../types/types";
import {google} from  '../../firebase/firebaseConfig'

// export const logoutAsincrono = () => {
//     return() => {
//         const auth = getAuth();
//         signOut(auth)
//         .then(() => {
//             console.log("Chao");
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     }
// }



export const loginEmailPassAsincrono = (email, pass) => {
    return() => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
        .then(({user}) => {
            console.log(user);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const loginGoogleAsincrono = () => {
    return(dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, google)
        .then(({user}) => {
            dispatch(loginSincrono(user.uid, user.displayName))
            console.log(user)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const loginFacebookAsincrono = () => {
    return(dispatch) => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then(({user}) => {
            dispatch(loginSincrono(user.uid, user.displayName))
            console.log(user)
        })
        .catch(error => {
            console.log(error);
        })
    }
}


export const loginSincrono = (id, displayname) => {
    return{
        type: types.login,
        payload:{
            id,
            displayname
        }
    }
}

// export const logoutSincrono = () => ({
//         type: types.logout
// })
