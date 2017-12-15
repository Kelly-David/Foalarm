// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyChzbUrxgIrll5TMnZBTfsL35nlMFXp5R8',
    authDomain: 'foalarm.firebaseapp.com',
    databaseURL: 'https://foalarm.firebaseio.com',
    projectId: 'foalarm',
    storageBucket: 'foalarm.appspot.com',
    messagingSenderId: '359025087096'
  }
};
