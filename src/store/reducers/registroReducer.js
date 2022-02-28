import { types } from "../../types/types"


export const registroReducer = (state = {}, action) => {
    switch (action.type) {
        case types.registro:
            return{
                email: action.payload.email,
                pass: action.payload.pass,
                name: action.payload.name
            }

        default:
            return state
    }
}
