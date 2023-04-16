import firebase from "../firebase";

const db = firebase.collection("/clips");

class ClipsDataService {
  getAll() {
    return db;
  }

  create(clip) {
    return db.add(clip);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new ClipsDataService();