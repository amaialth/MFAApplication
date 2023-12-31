import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthClientService } from 'src/app/auth-client.service';
import { MfaVerificationResponse } from 'src/app/shared/mfa-verification-response.modal';
import { MfaVerificationRequest } from 'src/app/shared/mfa-verification-request.model';
@Component({
  selector: 'app-display-qr',
  templateUrl: './display-qr.component.html',
  styleUrls: ['./display-qr.component.scss']
})
export class DisplayQrComponent implements OnInit {
  @Input("qrCode")
  imageUrl: any;
  @Input("qrCodeKey")
  qrCodeKey: any;
  @Input("username")
  username!: string;
  totpForm!: FormGroup;
  message!: string;
  constructor(private authenticationClient: AuthClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.totpForm = new FormGroup({
      totp: new FormControl('', Validators.required)
    })
  }
  confirm(){
    let totop = this.totpForm?.get("totp")?.value;
    if(totop){
      let payload: MfaVerificationRequest = new MfaVerificationRequest(this.username, totop)
      this.authenticationClient.verifyTotp(payload).subscribe((response: MfaVerificationResponse) => {
        this.message = response.message;
        if(response.tokenValid)
          this.router.navigate(['/login']);
      });
    }
  }
}
