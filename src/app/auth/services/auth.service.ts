//import { User } from '@shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { RoleValidator } from '../helpers/roleValidator';
import { User } from 'src/app/shared/models/user.interface';
import firebase from "firebase";
import auth = firebase.auth;
//import { RoleValidator } from '@auth/helpers/roleValidator';

@Injectable({ providedIn: 'root' })
export class AuthService extends RoleValidator {
  isSuscriptor(user: any): any {
      throw new Error('Method not implemented.');
  }
  isEditor(user: any): any {
      throw new Error('Method not implemented.');
  }
  isAdmin(user: any): any {
      throw new Error('Method not implemented.');
  }
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    // @ts-ignore
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {

        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  // @ts-ignore
  async loginGoogle(): Promise<User> {
    try {
      // @ts-ignore
      // @ts-ignore
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      // @ts-ignore
      this.updateUserData(user);
      // @ts-ignore
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    // @ts-ignore
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  // @ts-ignore
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      // @ts-ignore
      this.updateUserData(user);
      // @ts-ignore
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // @ts-ignore
  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      // @ts-ignore
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'ADMIN',
    };

    return userRef.set(data, { merge: true });
  }
}
