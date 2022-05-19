import { collection, doc,setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { logopedContverter } from "./firebaseClasses/Logoped";
import { patientContverter } from "./firebaseClasses/Patient";
import { db } from './firebaseClient';


export const getAllPatients = async ()  =>{
    const patients = await getDocs(collection(db, "patients"))
    let p = []
    patients.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        p.push({
           fullname: doc.data().fullname, 
           phonenumber: doc.data().phonenumber,
           personnumber: doc.data().personnumber
       });
      }); 

    return p;
}

export const getAllLogopeds = async ()  =>{
    const logo = await getDocs(collection(db, "logopeds"))
    let l = []
    logo.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        l.push({
            fullname: doc.data().fullname, 
            phonenumber: doc.data().phonenumber,
            personnumber: doc.data().personnumber
        });
        }); 
    return l;
}

export const getLogoped = async(phonenumber) =>{
    const ref = doc(db, "logopeds", phonenumber).withConverter(logopedContverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const logoped = docSnap.data();
        return logoped;

    }
}

export const getPatientsToLogoped = async(phonenumber) =>{
    const logoped = await getLogoped(phonenumber);
    let patients =[]
    for(let i=0; i< logoped?.patients?.length; i++) {
        const ref = doc(db, "patients", logoped.patients[i].id).withConverter(patientContverter);
        const docSnap = await getDoc(ref);
        const patient = docSnap.data();
        patients.push(patient);

      }
    return patients;
}
export const addLogoped = async (fullname,personnumber,phonenumber) =>{
    const data ={
        fullname: fullname,
        personnumber: personnumber,
        phonenumber: phonenumber

    }
    await setDoc(doc(db, "logopeds", phonenumber),data )

}

export const addPatient = async (fullname,personnumber,phonenumber) =>{
    const data ={
        fullname: fullname,
        personnumber: personnumber,
        phonenumber: phonenumber

    }
    await setDoc(doc(db, "patients", phonenumber),data )

}
export const removePatient = async (phonenumber) =>{await deleteDoc(doc(db, 'patients', phonenumber));}
export const removeLogoped = async (phonenumber) =>{await deleteDoc(doc(db, 'logopeds', phonenumber));}