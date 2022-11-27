import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../constants/firebaseconfig";
import type { Animal, Trip, User } from "../types";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const observatiiRef: CollectionReference = collection(db, "observatii");
const animalRef: CollectionReference = collection(db, "animale");
const auth = getAuth();

export async function requestAnimals() {
  const reqData: Array<Animal> = [];
  getDocs(animalRef).then((snapshot) => {
    for (let row of snapshot.docs) {
      const localData = row.data();
      const patchedData = {
        denumire: localData.denumire,
        denumireStiintifica: localData.denumire_stiintifica,
        tip: localData.tip,
      };
      reqData.push(patchedData);
      console.log(reqData);
    }
  });

  localStorage.Animals = reqData;
  return reqData;
}

export async function registerUser(data: User) {
  const mata = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return mata;
}

export async function postTrip(trip: Trip) {
  trip.observatii.forEach((observatie) => {
    let res = addDoc(observatiiRef, { ...observatie });
    return res;
  });
}
