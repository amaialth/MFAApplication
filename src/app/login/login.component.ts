import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthClientService } from '../auth-client.service';
import { MfaVerificationResponse } from '../shared/mfa-verification-response.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  response!: MfaVerificationResponse;
  message!: string;
  constructor(private authenticationClient: AuthClientService,
    private authService: AuthService) { 
      if(this.authService.isLoggedIn())
        this.authService.navidateToHome();

    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  login(){
    this.authenticationClient.login(this.loginForm.value).subscribe((loginResponse: MfaVerificationResponse) => {
      this.response = loginResponse;
      this.message = loginResponse.message;
        ///this.authService
    });
  }

}
