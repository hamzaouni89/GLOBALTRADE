import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase/app';
import { map } from 'rxjs/internal/operators/map';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /* template: `
  <div *ngIf="afAuth.user | async as user; else showLogin">
    <h1>Hello {{ user.displayName }}!</h1>
    <button (click)="logout()">Logout</button>
  </div>
  <ng-template #showLogin>
    <p>Please login.</p>
    <button (click)="login()">Login with Google</button>
  </ng-template>
` */,
})

export class LoginComponent {
  loginForm: FormGroup;
  items: Observable<any[]>;


  // tslint:disable-next-line:no-inferrable-types
  errorMessage: string = '';
  element: any;
  itemsRef: AngularFireList<any>;


  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router, private fb: FormBuilder) {

    this.createForm();

    this.itemsRef = db.list('users');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes: any)=>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );


  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    let connected = [];
    localStorage.setItem("connected", JSON.stringify(connected));
  }
  loginEmail() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  tryLogin(value) {
    this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(res => {
      console.log(res.user.uid);

      this.items.forEach(user => {

        user.forEach(u => {

          if (u.uid === res.user.uid) {

            console.log(true);
            localStorage.setItem("connected", JSON.stringify(u));
            this.router.navigate(['/']);
          //  window.location.replace('http://localhost:4200/portfolio');


          }
        })

      });



      //  this.router.navigate(['/user']);
    });
  }
}
