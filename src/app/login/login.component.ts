import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  userInfo = null;

  ngOnInit(): void {
    this.resetUserInfo();
  }

  resetUserInfo() {
    this.userInfo = {
      email: '',
      password: '',
    };
  }

  login(userInfo) {
    if (sessionStorage.getItem(userInfo.email)) {
      if (
        userInfo.password ==
        JSON.parse(sessionStorage.getItem(userInfo.email)).password
      ) {
        let userId = JSON.parse(sessionStorage.getItem(userInfo.email)).id;
        this.router.navigate(['/home'], { queryParams: { id: userId } });
      }
    }
  }

  changeRoute() {
    this.router.navigateByUrl('/signUp');
  }
}
