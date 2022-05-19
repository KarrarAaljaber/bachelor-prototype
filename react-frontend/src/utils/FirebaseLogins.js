import { collection, doc, getDoc } from "firebase/firestore";
import { patientContverter } from './firebaseClasses/Patient';
import { logopedContverter } from './firebaseClasses/Logoped';
import { signInWithPhoneNumber,RecaptchaVerifier  } from "firebase/auth";
import {authorize, db} from "../utils/firebaseClient";


const captcha =() =>{
    window.recaptchaVerifier = new RecaptchaVerifier('captchatest', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
        }, authorize);

}

export const LoginAsPatient = async(phoneNumber, setUsername, setGotCode) =>{

    const ref = doc(db, "patients", phoneNumber).withConverter(patientContverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const patient = docSnap.data();
        console.log(patient.toString());
        captcha()
        const captchaVer = window.recaptchaVerifier;
        setUsername(patient.fullname)
        

                
        signInWithPhoneNumber(authorize, "+47" +phoneNumber, captchaVer)
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).

            window.confirmationResult = confirmationResult;
            setGotCode(true)
            

        }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error)
        });

        

      } else {
        alert("Det finnes ikke en pasient med dette nummert!")
      }


}

export const LoginAsLogoped = async(phoneNumber, setUsername, setGotCode ) => {
    const ref = doc(db, "logopeds", phoneNumber).withConverter(logopedContverter);
              const docSnap = await getDoc(ref);
              if (docSnap.exists()) {
                  const logoped = docSnap.data();
                  console.log(logoped.toString());
                  captcha()
                  const captchaVer = window.recaptchaVerifier;
                  setUsername(logoped.fullname)
                  
                  signInWithPhoneNumber(authorize, "+47" +phoneNumber, captchaVer)
                  .then((confirmationResult) => {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).

                      window.confirmationResult = confirmationResult;
                      setGotCode(true)

  
                  }).catch((error) => {
                  // Error; SMS not sent
                  // ...
                  console.log(error)
                  });
  
  
                  
                } else {
                  alert("Det finnes ikke en logoped med dette nummert!")
                }
}

