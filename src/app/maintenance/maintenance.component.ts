import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  formData: any = {
    name: '',
    email: '',
    projectName: '',
    projectTech: '',
    projectType: '',
    platform: '',
    description: ''
  };

  showModal = false;

  scriptUrl =
    'https://script.google.com/macros/s/AKfycbzGL6vNz6lUrt6CYN6Wo_QCAVL9PuVUYmTF3KMHAoyg_2BagPxsb6idqAIp9xQjVfSFrg/exec';

  constructor(private http: HttpClient) {}

  onNameInput() {
    if (this.formData.name) {
      this.formData.name = this.formData.name.replace(/[^A-Za-z ]/g, '');
    }
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const params = new URLSearchParams({
      name: this.formData.name,
      email: this.formData.email,
      projectName: this.formData.projectName,
      projectTech: this.formData.projectTech,
      projectType: this.formData.projectType,
      platform: this.formData.platform,
      description: this.formData.description
    }).toString();

    const url = `${this.scriptUrl}?${params}`;

    fetch(url, { method: 'GET', mode: 'no-cors' })
      .then(() => {
        this.showModal = true;
        this.formData = {};
        form.resetForm();

        setTimeout(() => (this.showModal = false), 3000);
      })
      .catch((err) => console.error('Submission failed', err));
  }

  closeModal() {
    this.showModal = false;
  }
}
