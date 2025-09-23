// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss']
// })
// export class ContactComponent {
//   contact = {
//     name: '',
//     email: '',
//     message: ''
//   };

//   submitForm() {
//     if (this.contact.name && this.contact.email && this.contact.message) {
//       alert('Thank you for contacting us!');
//       this.contact = { name: '', email: '', message: '' };
//     } else {
//       alert('Please fill in all fields.');
//     }
//   }
// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitForm() {
    console.log('Form submitted:', this.contact);
    // Here you can integrate API call to send the form
    alert('Thank you for reaching out! We’ll get back to you soon.');
    this.contact = { name: '', email: '', subject: '', message: '' };
  }
}
