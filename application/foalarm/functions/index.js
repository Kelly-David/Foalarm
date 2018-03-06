const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Import Twilio
const twilio = require('twilio');
const accountSID = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;

const client = new twilio(accountSID, authToken);

// Twilio Phone number
const twilioPhoneNumber = '+353861802891';

// SendGrid 
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

// Export CSV
const fs = require('fs-extra');
const gcs = require('@google-cloud/storage')();
const path = require('path');
const os = require('os');
const json2csv = require('json2csv');

/**
 * Start Cloud Function firebaseToFirestore: promise
 * Description: onWrite event to Firebase RTDB, copy data to Firestore DB.
 */
exports.firebaseToFirestore = functions.database.ref('/data/{alarmkey}/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.alarmkey;
        const datakey = event.params.dataKey;
        // TESTING
        console.log('Alatm Key ', alarmId);
        console.log('Data ', event.params.dataKey);
        // Retrieve the data ref
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

                var ref = admin.firestore().collection('data').doc(`${key}`).collection('data').doc();
                const time = getTimeStamp();

                return ref.set({
                    id: ref.id,
                    alarmRef: key,
                    x: xValue,
                    y: yValue,
                    z: zValue,
                    createdAt: time
                })
            })
            .catch(error => console.log(error));
    });

/**
 * Start Cloud Function testFoalAlert: promise (twilio SMS)
 * Description: onWrite event to Firestore, send SMS notification.
 */
exports.textFoalAlert = functions.firestore.document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        // const firestore = event.data.ref.firestore;
        // Retrieve the reference to the alarm form Firestore collection
        return admin.firestore().doc(`alarms/${alarmId}`).get().then(function (doc) {
            if (doc.exists) {
                // TESTING
                console.log('Document data: ', doc.data());
                const phoneNumber = doc.data().phone;
                // TESTING
                console.log('Phone number: ', phoneNumber);
                if (doc.data().phone) {

                    const alarmKey = doc.data().id;
                    const phone = doc.data().phoneNumber;
                    // REtrive the associated horse ref
                    admin.firestore().collection('horses')
                        .where('alarmId', '==', alarmKey)
                        .get()
                        .then(snapshotQuery => {
                            snapshotQuery.forEach(doc => {
                                if (doc.data().alarmId == alarmKey) {
                                    const horse = doc.data().displayName;
                                    // TESTING
                                    console.log('Horse name: ', doc.data().displayName);
                                    const textMessage = {
                                        body: `Foaling Alert for ${horse}`,
                                        to: phoneNumber,  // Text to this number
                                        from: twilioPhoneNumber // From a valid Twilio number
                                    }
                                    // Send the SMS
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


/**
 * Start Cloud Function testFoalAlertEmail: promise (sendgrid transactional email)
 * Description: onWrite event to Firestore, send email notification.
 */
exports.sendFoalAlertEmail = functions.firestore
    .document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        // Retrieve the alarm reference from Firestore        
        return admin.firestore().doc(`alarms/${alarmId}`)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    const email = doc.data().emailAddress;
                    if (email) {
                        const alarmKey = doc.data().id;
                        const email = doc.data().emailAddress;
                        // Retrieve the associated horse reference
                        admin.firestore().collection('horses')
                            .where('alarmId', '==', alarmKey)
                            .get()
                            .then(snapshotQuery => {
                                snapshotQuery.forEach(doc => {
                                    if (doc.data().alarmId == alarmKey) { // Found the horse
                                        const horse = doc.data();
                                        const msg = {
                                            to: email,
                                            from: 'alerts@foalarm.com',
                                            subject: 'Foaling Alert!',
                                            templateId: '957f3c38-c900-4ecb-8a02-8022509799a9',
                                            substitutionWrappers: ['{{', '}}'],
                                            substitutions: {
                                                horseName: horse.displayName,
                                                camera: horse.camera
                                            }
                                        };
                                        // Send the email
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

/**
 * Start Cloud Function saveFoalingalert: promise
 * Description: onWrite event to Firestore, create in-app notifaction.
 */
exports.saveFoalingAlert = functions.firestore
    .document('data/{key}/data/{dataKey}')
    .onWrite(event => {
        const alarmId = event.params.key;
        // Retrieve the alarm reference from Firestore
        return admin.firestore().doc(`alarms/${alarmId}`)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    const alarmKey = doc.data().id;
                    // Retrieve the associated horse reference
                    admin.firestore().collection('horses')
                        .where('alarmId', '==', alarmKey)
                        .get()
                        .then(snapshotQuery => {
                            snapshotQuery.forEach(doc => {
                                if (doc.data().alarmId == alarmKey) {
                                    // Found the horse in Firestore
                                    const horse = doc.data();
                                    const time = getTimeStamp();
                                    // Point to the alerts collection
                                    var horseAlertRef = admin.firestore().collection('alerts').doc();
                                    const uniqueRef = horseAlertRef.id;
                                    // Update the document in Firestore
                                    return horseAlertRef.set({
                                        id: uniqueRef,
                                        owner: horse.ownerUID,
                                        horseName: horse.displayName,
                                        horseId: horse.id,
                                        updatedAt: time,
                                        createdAt: time,
                                        viewed: false,
                                        deleted: false
                                    })
                                }
                            });
                        });
                }
            });
    });

/**
 * 
 */
exports.pushNotication = functions.firestore
    .document('alerts/{alertKey}').onCreate(event => {
        const message = event.data.data();
        const alertKey = event.params.alertKey;
        const userId = message.owner;
        // Build the message
        const payload = {
            notification: {
                title: `Foaling Alert for ${message.horseName}`,
                body: message.createdAt.toString()
            }
        };
        // Retreive the token from Firebase RT DB
        admin.database()
            .ref(`/fcmTokens/${userId}`)
            .once('value')
            .then(token => token.val())
            .then(usrFcmToken => {
                // Send the message to the device
                return admin.messaging().sendToDevice(usrFcmToken, payload)
            })
            .then(res => {
                console.log('Message sent successfully ', res);
            })
            .catch(err => {
                console.log('Message error ', err);
            });
    });

/** 
 * 
*/
exports.createDataCSV = functions.firestore
    .document('reports/{reportId}')
    .onCreate(event => {
        const reportId = event.params.reportId;
        const fileName = `data/${reportId}.csv`;
        const tempFilePath = path.join(os.tmpdir(), fileName);
        const data = event.data.data();
        const alarmId = data.alarmId;

        // Reference report in Firestore
        const db = admin.firestore()
        const reportRef = db.collection('reports').doc(reportId)

        // Reference Storage Bucket
        const storage = gcs.bucket('foalarm.appspot.com')

        // Query collection
        return admin.database().ref(`activity/${alarmId}`).limitToLast(40000)
            .once('value')
            .then(data => {

                // Creates CSV file from with activity collection
                const activity = []

                // Create array of activity data
                data.forEach(doc => {
                    activity.push(doc.val())
                });

                return json2csv({ data: activity });
            })
            .then(csv => {
                // Write the file to cloud function tmp storage
                return fs.outputFile(tempFilePath, csv);
            })
            .then(() => {
                // Upload the file to Firebase cloud storage
                return storage.upload(tempFilePath, { destination: fileName })
            })
            .then(file => {
                // Update status to complete in Firestore 
                return reportRef.update({ status: 'complete' })
            })
            .catch(err => console.log(err))
    });


/**
* function getTimeStamp: number
* Description: return server timestamp
*/
function getTimeStamp() {
    return admin.firestore.FieldValue.serverTimestamp();
};
