

class Patient {
    constructor (fullname, personnumber, phonenumber ) {
        this.fullname = fullname;
        this.personnumber = personnumber;
        this.phonenumber = phonenumber;
    }
    toString() {
        return this.fullname + ', ' + this.personnumber + ', ' + this.phonenumber;
    }
}

// Firestore data converter
export const patientContverter= {
    toFirestore: (p) => {
        return {
            fullname: p.name,
            personnumber: p.personnumber,
            phonenumber: p.phonenumber
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Patient(data.fullname, data.personnumber, data.phonenumber);
    }
};