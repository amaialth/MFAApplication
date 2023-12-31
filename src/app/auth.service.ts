import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthClientService } from './auth-client.service';
import { Router } from '@angular/router';
import { MfaVerificationRequest } from './shared/mfa-verification-request.model';
import { MfaVerificationResponse } from './shared/mfa-verification-response.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  constructor(private authenticationClient: AuthClientService, private router: Router) { }

  public login(payload: MfaVerificationResponse): void {
    if(payload.tokenValid && !payload.mfaRequired){
      localStorage.setItem(this.tokenKey, payload.jwt);
    }
  }

  public navidateToHome(): void {
    this.router.navigate(['/']);
  }

  public validateMfaCode(payload: MfaVerificationRequest): void {
    let loginResponse = localStorage.getItem(this.tokenKey);
    if(loginResponse){
      let token: MfaVerificationResponse = JSON.parse(loginResponse);
      payload.username = token.username;
      this.authenticationClient.verifyTotp(payload).subscribe((response: MfaVerificationResponse) => {
        if(response.tokenValid)
          this.router.navigate(['/']);
      });
    }
  }

  public register(payload: string): void {
    this.authenticationClient
      .register(payload)
      .subscribe((mfaQR:any) => {
        let parsed = JSON.parse(mfaQR);
        //localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/qr', {'qrCode': parsed.qrCode, 'qrCodeKey': parsed.mfaCode}]);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
