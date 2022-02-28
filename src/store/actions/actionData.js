import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {types} from '../../types/types'

export const RegistroAsincronoData = (data) => {
  return () => {
    addDoc(collection(db, "Prueba-Tecnica"), data);
  };
};


export const ListarDataAsincronico = () => {
  return async (dispatch) => {
    const listar = await getDocs(collection(db, "Prueba-Tecnica"));
    let listarInfo = [];

    listar.forEach((element) => {
      listarInfo.push({ ...element.data() });
    });
    dispatch(listarDataSincrono(listarInfo));
  };
}

export const listarDataSincrono = (listarInfo) => {
  return {
    type: types.listar,
    payload: listarInfo,
  };
};


export const eliminarDataSincrono = (IdData) => {
  return {
    type: types.eliminar,
    payload: IdData,
  };
};

export const eliminarDataAsincrono = (IdData) => {
  return async (dispatch) => {
    const dataCollection = collection(db, "Prueba-Tecnica");
    const q = query(dataCollection, where("id", "==", IdData));

    const datos = await getDocs(q);
    datos.forEach((docu) => {
      console.log(docu);

      deleteDoc(doc(db, "Prueba-Tecnica", docu.id));
    });

    dispatch(eliminarDataSincrono(IdData));
    dispatch(ListarDataAsincronico());
  };
};

export const editarDataAsincrono = (id, data) => {
  return async () => {
    const dataCollection = collection(db, "Prueba-Tecnica");
    const q = query(dataCollection, where("id", "==", id));

    const datos = await getDocs(q);
    let idForEach;
    datos.forEach(async (documento) => {
      idForEach = documento.id;
    });

    const Editar = doc(db, "Prueba-Tecnica", idForEach);
    await updateDoc(Editar, data).then(() => {
      ListarDataAsincronico();
    });
  };
};

export const editarDataSincrono = (data) => {
  return {
    type: types.editar,
    payload: data,
  };
};
