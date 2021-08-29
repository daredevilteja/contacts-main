import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Contacts';
  userId = null;
  userEmail = '';
  password = '';
  flag = true;
  selectedContact = null;
  contactList = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.resetSelectedContact();
    this.userId = this.route.snapshot.queryParams.id;
    Object.entries(sessionStorage).some((entry) => {
      let key = entry[0];
      let value = JSON.parse(entry[1]);
      if (value.id == this.userId) {
        this.userEmail = key;
        return;
      }
    });
    this.contactList =
      JSON.parse(sessionStorage.getItem(this.userEmail)).contacts !== null
        ? JSON.parse(sessionStorage.getItem(this.userEmail)).contacts
        : [];
    this.password = JSON.parse(sessionStorage.getItem(this.userEmail)).password;
  }

  resetSelectedContact() {
    this.selectedContact = {
      id: null,
      name: '',
      phNum: null,
      email: '',
    };
  }

  saveContact() {
    if (
      this.contactList[this.contactList.length] == undefined ||
      this.contactList[this.contactList.length].id === null
    ) {
      this.selectedContact.id = Number(this.contactList.length) + 1;
    } else {
      this.selectedContact.id += 1;
    }

    this.contactList.push(this.selectedContact);
    sessionStorage.setItem(
      this.userEmail,
      JSON.stringify({
        id: this.userId,
        contacts: this.contactList,
        password: this.password,
      })
    );
    this.resetSelectedContact();
    this.flag = true;
  }

  setFlag() {
    this.flag = false;
  }

  cancel() {
    this.resetSelectedContact();
    this.flag = true;
  }

  redirectToHome() {
    this.router.navigate(['/login']);
  }
}
