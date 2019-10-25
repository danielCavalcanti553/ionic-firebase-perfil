import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss'],
})
export class LogoffPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, 
    private router : Router) { }

  ngOnInit() {
    this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem("uid");
      this.router.navigate(['/login']);
    }).catch(()=>{
      this.router.navigate(['/home']);
    })
  }

}
