export const getData = (coleccionName) => {
    return  firebase.firestore().collection(coleccionName).get();
  };

export const guardarData = (coleccionName, obj) => {
    return firebase.firestore().collection(coleccionName).add(obj);
}