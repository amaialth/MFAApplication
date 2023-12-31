import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
 faUserCircle
} from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIcon = faUserCircle;
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
