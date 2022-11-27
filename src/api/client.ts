import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, CollectionReference, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../constants/firebaseconfig";
import { Animal, Trip } from "../types";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const observatiiRef:CollectionReference = collection(db, "observatii");
const animalRef:CollectionReference = collection(db, "animale");


export async function requestAnimals() {
    const reqData : Array<Animal> = [];
    getDocs(animalRef).then(snapshot => {
        for(let row of snapshot.docs){
          const localData = row.data();
          const patchedData = {denumire: localData.denumire, denumireStiintifica: localData.denumire_stiintifica, tip: localData.tip};
          reqData.push(patchedData);
          console.log(reqData);
        }
      });
    return reqData;
}

export async function postTrip(trip:Trip) {
  trip.observatii.forEach(observatie => {
    let res;
    addDoc(observatiiRef, {...observatie}).then((resp) => {
      res = resp;
    }).catch(() => console.log("mata"));
  })
}