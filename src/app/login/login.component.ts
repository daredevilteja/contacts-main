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
    fetch('http://localhost:9999/login', {
      method: 'POST',
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((r) => {
        if (r.ok) {
          let userId = 0;
          r.json().then((res) => (userId = res.id));

          return { success: true, id: userId };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          this.router.navigate(['/home'], {
            queryParams: { id: r.id },
          });
        }
      });
  }

  changeRoute() {
    this.router.navigateByUrl('/signUp');
  }
}
