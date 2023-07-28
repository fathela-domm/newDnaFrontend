// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backendUri: "https://tender-blue-jumpsuit.cyclic.app/",
  firebaseConfig: {
    apiKey: "AIzaSyCI0MIUi31DxlDw9Uye6ngoilk1N8j147E",
    authDomain: "codify-io.firebaseapp.com",
    databaseURL: "https://codify-io-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codify-io",
    messagingSenderId: "784918095551",
    appId: "1:784918095551:web:8076716bd74bd20a30880a",
    storageBucket: "codify-io.appspot.com",
  }
};
