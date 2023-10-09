import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  
  isAuthenticated: boolean = false;
  firstName: string = '';

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
      
    }

  ngOnInit(): void {
    // subscribe to authentication state change
    this.oktaAuthService.authState$.subscribe(
      result => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // fetch the user detail
      this.oktaAuth.getUser().then(
        res => {
          this.firstName = res.name.split(' ')[0] as string;
          
          const userEmail = res.email;
          this.storage.setItem('userEmail', JSON.stringify(userEmail));
        }
      );
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
