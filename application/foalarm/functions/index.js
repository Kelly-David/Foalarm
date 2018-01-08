
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

/// Start the Cloud Function

exports.textFoalAlert = functions.firestore.document('data/{key}')
.onUpdate(event => {
    const alarmId = event.data.id;
    const firestore = event.data.ref.firestore;

    return admin.firestore().doc(`alarms/${alarmId}`).get().then(function(doc) {
        if (doc.exists) {
            console.log('Document data: ', doc.data());
            const phoneNumber = doc.data().phone;
            console.log('Phone number: ', phoneNumber);
            if(doc.data().alert === true) {

                const textMessage = {
                    body: `Current alarm status`,
                    to: phoneNumber,  // Text to this number
                    from: twilioPhoneNumber // From a valid Twilio number
                }
                return client.messages.create(textMessage)
                .then(message => console.log(message.sid, 'Success'))
                .catch(error => console.log('Twilio send error: ', error));
            }

        } else{
            console.log('Not such document exists');
        }
    }).catch(function(error) {
        console.log('Error caught: ', error);
    });
              
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
