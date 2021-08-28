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
    sessionStorage.setItem(
      this.newUser.email,
      JSON.stringify({
        id: sessionStorage.length + 1,
        contacts: [],
        password: this.newUser.password,
      })
    );
    this.router.navigate(['/login']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
