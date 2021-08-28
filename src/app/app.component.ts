import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'contacts-main';

  userInfo = {
    email: '',
    password: '',
  };

  login() {
    if (sessionStorage.getItem('email'))
      this.userInfo.password = JSON.parse(
        sessionStorage.getItem('email')
      ).password;
  }
}
