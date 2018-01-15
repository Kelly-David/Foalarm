const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Import Twilio
const twilio = require('twilio');
const accountSID = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = new twilio(accountSID, authToken);

// Twilio Phone number
const twilioPhoneNumber = '+353861801437';

// SendGrid 
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

/// Start Cloud Function
exports.firebaseToFirestore = functions.database.ref('/data/{alarmkey}/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.alarmkey;
        const datakey = event.params.dataKey;
        console.log('Alatm Key ', alarmId);
        console.log('Data ', event.params.dataKey);

        return admin.database()
            .ref(`/data/${alarmId}/${datakey}`)
            .once('value')
            .then(snapshot => snapshot.val())
            .then(order => {
                const xValue = order.x;
                const yValue = order.y;
                const zValue = order.z;
                const key = order.id;
                const data = xValue + ',' + yValue + ',' + zValue;

                return admin.firestore()
                    .collection('data')
                    .doc(`${key}`)
                    .collection('data')
                    .add({ 'data': data });
            })
            .catch(error => console.log(error));


    });

/// Start Cloud Function
exports.textFoalAlert = functions.firestore.document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        // const firestore = event.data.ref.firestore;

        return admin.firestore().doc(`alarms/${alarmId}`).get().then(function (doc) {
            if (doc.exists) {
                console.log('Document data: ', doc.data());
                const phoneNumber = doc.data().phone;
                console.log('Phone number: ', phoneNumber);
                if (doc.data().phone) {

                    const alarmKey = doc.data().id;
                    const phone = doc.data().phoneNumber;

                    admin.firestore().collection('horses')
                        .where('alarmId', '==', alarmKey)
                        .get()
                        .then(snapshotQuery => {
                            snapshotQuery.forEach(doc => {
                                if (doc.data().alarmId == alarmKey) {
                                    const horse = doc.data().displayName;
                                    console.log('Horse name: ', doc.data().displayName);

                                    const textMessage = {
                                        body: `Foaling Alert for ${horse}`,
                                        to: phoneNumber,  // Text to this number
                                        from: twilioPhoneNumber // From a valid Twilio number
                                    }
                                    return client.messages.create(textMessage)
                                        .then(message => console.log(message.sid, 'Success'))
                                        .catch(error => console.log('Twilio send error: ', error));
                                }
                            })
                        });
                }
            } else {
                console.log('Not such document exists');
            }
        }).catch(function (error) {
            console.log('Error caught: ', error);
        });

    });


// Start Cloud Function
exports.sendFoalAlertEmail = functions.firestore
    .document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        return admin.firestore().doc(`alarms/${alarmId}`)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    const email = doc.data().emailAddress;
                    if (email) {
                        const alarmKey = doc.data().id;
                        const email = doc.data().emailAddress;

                        admin.firestore().collection('horses')
                            .where('alarmId', '==', alarmKey)
                            .get()
                            .then(snapshotQuery => {
                                snapshotQuery.forEach(doc => {
                                    if (doc.data().alarmId == alarmKey) {
                                        const horse = doc.data();
                                        const msg = {
                                            to: email,
                                            from: 'alerts@foalarm.com',
                                            subject: 'Foaling Alert!',
                                            templateId: '957f3c38-c900-4ecb-8a02-8022509799a9',
                                            substitutionWrappers: ['{{', '}}'],
                                            substitutions: {
                                                horseName: horse.displayName
                                            }
                                        };
                                        return sgMail.send(msg)
                                            .then(() => console.log('email sent!'))
                                            .catch(err => console.log(err))
                                    }
                                });
                            });
                    }
                }
            });
    });

// Start Cloud Function
exports.saveFoalingAlert = functions.firestore
    .document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        return admin.firestore().doc(`alarms/${alarmId}`)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    const alarmKey = doc.data().id;

                    admin.firestore().collection('horses')
                        .where('alarmId', '==', alarmKey)
                        .get()
                        .then(snapshotQuery => {
                            snapshotQuery.forEach(doc => {
                                if (doc.data().alarmId == alarmKey) {

                                    // Found the horse
                                    const horse = doc.data();
                                    const time = getTimeStamp();
                                    var horseAlertRef = admin.firestore().collection('alerts').doc(`${horse.id}`).collection('alerts').doc();
                                    const uniqueRef = horseAlertRef.id;
                                    return horseAlertRef.set({
                                        id: uniqueRef,
                                        updatedAt: timeStamp,
                                        createdAt: timeStamp,
                                        viewed: false,
                                        deleted: false
                                    })
                                }
                            });
                        });
                }
            });
    });

function getTimeStamp() {
    return admin.database.ServerValue.TIMESTAMP;
};