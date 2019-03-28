import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router, ) { }

  ngOnInit() {

  }
  logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
