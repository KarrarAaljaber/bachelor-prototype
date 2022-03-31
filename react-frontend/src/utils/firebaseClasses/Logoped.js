

class Logoped {
    constructor (fullname, personnumber, phonenumber, patients ) {
        this.fullname = fullname;
        this.personnumber = personnumber;
        this.phonenumber = phonenumber;
        this.patients = patients;
    }
    toString() {
        return this.fullname + ', ' + this.personnumber + ', ' + this.phonenumber +', ' + this.patients;
    }
}

// Firestore data converter
export const logopedContverter= {
    toFirestore: (p) => {
        return {
            fullname: p.name,
            personnumber: p.personnumber,
            phonenumber: p.phonenumber,
            patients: p.patients,

            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Logoped(data.fullname, data.personnumber, data.phonenumber, data.patients);
    }
};