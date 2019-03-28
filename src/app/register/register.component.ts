import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { store } from '@angular/core/src/render3';

import { shouldCallLifecycleInitHook } from '@angular/core/src/view';
import { NgForm } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  // tslint:disable-next-line:no-inferrable-types
  errorMessage: string = '';
  // tslint:disable-next-line:no-inferrable-types
  successMessage: string = '';
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  authState: any;
  uid: string;
  // public mail;
  // public password;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    db: AngularFireDatabase,
    public afA: AngularFireAuth
  ) {
    this.createForm();
    this.itemsRef = db.list('users');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  createForm() {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        // this.router.navigate(['/user']);
      }, err => console.log(err)
      );
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res.user.uid);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        const user = {
          uid: res.user.uid,
          name: value.nom,
          prenom: value.prenom,
          email: value.email,


        };
        this.itemsRef.push(user);

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  ngOnInit() { }

}
