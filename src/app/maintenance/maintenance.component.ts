import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  formData: any = {};
  selectedFile: File | null = null;
  showModal = false;

  scriptUrl = "https://script.google.com/macros/s/AKfycbzGL6vNz6lUrt6CYN6Wo_QCAVL9PuVUYmTF3KMHAoyg_2BagPxsb6idqAIp9xQjVfSFrg/exec";

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onNameInput() {
  if (this.formData.name) {
    this.formData.name = this.formData.name.replace(/[^A-Za-z ]/g, ''); // removes special chars/numbers
  }
}


  submit(form: NgForm) {
    if (!form.valid) {
      return; // stop if invalid
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

    fetch(url, { method: "GET", mode: "no-cors" })
      .then(() => {
        this.showModal = true;
        this.formData = {}; // reset form
        form.resetForm();

        // auto-close after 3s
        setTimeout(() => this.showModal = false, 3000);
      });
  }

  closeModal() {
    this.showModal = false;
  }
}
