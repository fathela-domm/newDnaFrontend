import { firebase, firebaseui } from 'firebaseui-angular';

export const firebaseUIConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        {
            requireDisplayName: true,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};