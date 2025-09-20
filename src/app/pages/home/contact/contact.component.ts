import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      alert('Thank you for contacting us!');
      this.contact = { name: '', email: '', message: '' };
    } else {
      alert('Please fill in all fields.');
    }
  }
}
