import { types } from "../../types/types"

const initialstate = {array: []}

export const listarDataReducer = (estadoInicial=initialstate, action) => {
    switch (action.type) {
        case types.listar:
            return{
                array: [ ...action.payload]
            }
        case types.eliminar:
            return{
                array: estadoInicial.array.filter(usu => usu.id !== action.payload)
            }
        default:
            return estadoInicial
    }
}

