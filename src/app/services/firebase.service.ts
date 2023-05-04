/**
 * firebase 9.3.0 namespacing like in firebase 8
 */
import { Injectable } from '@angular/core';
import { environment } from "../../../src/environments/environment";
import { environment as productionEnvironment } from "../../../src/environments/environment.prod";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

@Injectable({
  providedIn: 'any'
})
export class FirebaseService {
  private fireapp = firebase;

  constructor() {
    let env = productionEnvironment.production ? productionEnvironment : environment;
    this.fireapp.initializeApp(env.firebaseConfig)
  }

  public addFirestoreDoc(firestoreCollection: string, data: any): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return this.fireapp.firestore()
      .collection(firestoreCollection)
      .add(data);
  }

  // fetches data from a specific document if documentId is passed otherwise return whole collection data
  public getFirestoreData(firestoreCollection: string, documentPath?: string): Promise<unknown> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        let result: any = [];
        if (documentPath) {
          const querySnapshot = (await this.fireapp.firestore().collection(firestoreCollection).doc(documentPath).get());
          result = {
            data: querySnapshot.data(),
            id: querySnapshot.id
          }
        } else {
          const querySnapshot = (await this.fireapp.firestore().collection(firestoreCollection).get());
          querySnapshot.forEach((doc: any) => {
            result.push({
              id: doc.id,
              data: doc.data()
            });
          });
        }
        resolve(result)
      }
      catch (e: any) {
        reject(e?.message || ":( Failed to fetch data from collection << " + firestoreCollection + ">>");
      }
    })
  }

  public async updateFirestoreData(path: string, data: any): Promise<void> {
    return await this.fireapp.firestore().doc(path)
      .update({ ...data })
  }

  public async delFirestoreDocData(path: string): Promise<void> {
    return await this.fireapp.firestore().doc(path).delete();
  }

  public getFirebaseDBData(path: string): Promise<unknown> {
    return new Promise((resolve: Function, reject: Function) => {
      try {
        const data: any = [];
        this.fireapp.database().ref().on("value", (snapshot: firebase.database.DataSnapshot) => {
          for (let id in snapshot.val()) {
            if (id == path) {
              Object.keys(snapshot.val()[id])
                .map(key => {
                  data.push({ ...snapshot.val()[id][key], id: key })
                });
            }
          }
        });
        resolve(data);
      }
      catch (e: any) {
        reject(e?.message || "Failed to fetch data from the database path << " + path + ">>");
      }
    });
  }

  public async addFirebaseDBData(path: string, data: any): Promise<firebase.database.ThenableReference> {
    return await this.fireapp.database()
      .ref()
      .child(path)
      .push(data);
  }

  public async updateFirebaseDBData(path: string, data: any): Promise<any> {
    return await this.fireapp.database()
      .ref()
      .child(path)
      .update(data);
  }

  public async deleteFirebaseDBData(path: string): Promise<any> {
    return await this.fireapp.database()
      .ref()
      .child(path)
      .remove();
  }

  public uploadFileToCloudStorage(path: string, file: any): firebase.storage.UploadTask {
    return this.fireapp.storage()
      .ref()
      .child(path)
      .put(file);
  }

  public monitorFileUploadTaskProgress(uploadTask: firebase.storage.UploadTask) {
    let uploadTaskProgressResult = {
      progress: 0 as number,
      uploadTaskState: "",
      fileDownloadURL: "",
    }

    uploadTask.on('state_changed',
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        uploadTaskProgressResult.progress = progress;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            uploadTaskProgressResult.uploadTaskState = 'Upload is paused';
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            uploadTaskProgressResult.uploadTaskState = 'Upload is running';
            break;
          case firebase.storage.TaskState.SUCCESS:
            uploadTaskProgressResult.uploadTaskState = ':) Upload task successfull';
            break;
          case firebase.storage.TaskState.ERROR:
            uploadTaskProgressResult.uploadTaskState = ':( Upload task failed';
            break;
          case firebase.storage.TaskState.CANCELED:
            uploadTaskProgressResult.uploadTaskState = ':( Upload task cancelled';
            break;
        }
      },
      (error: firebase.storage.FirebaseStorageError) => {
        // Handle unsuccessful uploads
        return error.message;
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          return uploadTaskProgressResult.fileDownloadURL = downloadURL;
        });
      });

    return uploadTaskProgressResult;
  }

  public pauseFileUploadTask(uploadTask: firebase.storage.UploadTask): boolean {
    return uploadTask.pause();
  }

  public resumePausedFileUploadTask(uploadTask: firebase.storage.UploadTask): boolean {
    return uploadTask.resume();
  }

  public cancelFileUploadTask(uploadTask: firebase.storage.UploadTask): boolean {
    return uploadTask.cancel();
  }

  public deleteStorageBucketFile(path: string): Promise<void> {
    return this.fireapp.storage()
      .ref()
      .child(path)
      .delete();
  }

  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireapp.auth()
      .signInWithEmailAndPassword(email, password);
  }

  public createAccount(email: string, password: string): Promise<void | firebase.auth.UserCredential> {
    return this.fireapp.auth()
      .createUserWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return firebase.auth().signOut();
  }
}