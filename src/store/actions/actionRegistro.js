import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { types } from "../../types/types";


export const RegistroAsincrono = (email, pass, name) => {
    return() => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then(({user}) => {
            console.log(user);
        })
        .catch(error => {
            console.log(error);
        })
    }
}


export const registroSincrono = (email, pass, name) => {
  return {
    type: types.registro,
    payload: {
      email,
      pass,
      name,
    },
  };
};
