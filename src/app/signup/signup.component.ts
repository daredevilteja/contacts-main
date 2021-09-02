import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  newUser = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  saveData() {
    // sessionStorage.setItem(
    //   this.newUser.email,
    //   JSON.stringify({
    //     id: sessionStorage.length + 1,
    //     contacts: [],
    //     password: this.newUser.password,
    //   })
    // );
    // this.router.navigate(['/login']);
    const user = {
      email: this.newUser.email,
      password: this.newUser.password,
    };
    this.signupHandler(user);
  }

  signupHandler(user) {
    fetch('http://localhost:9999/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          this.router.navigate(['/login']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
