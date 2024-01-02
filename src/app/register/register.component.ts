import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthClientService } from '../auth-client.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  mfaRes: any;
  isLoading = false;
  constructor(private authenticationClient: AuthClientService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      enableMfa: new FormControl('', Validators.required)
    });
    this.mfaRes = null;
  }
  register(){
    this.isLoading = true;
    this.authenticationClient
      .register(this.registerForm.value)
      .subscribe((mfaQR:any) => {
        this.isLoading = false;
        this.mfaRes = JSON.parse(mfaQR);
        console.log(this.mfaRes);
      });
  }
}
