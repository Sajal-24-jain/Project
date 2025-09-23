import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  standalone: true,
    imports: [FormsModule, CommonModule],
  // templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  template: `
    <form (ngSubmit)="submit()" #form="ngForm">
      <input type="text" placeholder="Name" [(ngModel)]="formData.name" name="name" required />
      <input type="email" placeholder="Email" [(ngModel)]="formData.email" name="email" required />
      <input type="text" placeholder="Project Name" [(ngModel)]="formData.projectName" name="projectName" required />
      <input type="text" placeholder="Project Tech" [(ngModel)]="formData.projectTech" name="projectTech" />

      <select [(ngModel)]="formData.projectType" name="projectType">
        <option value="Full Stack">Full Stack</option>
        <option value="Backend">Backend</option>
        <option value="Frontend">Frontend</option>
      </select>

      <select [(ngModel)]="formData.platform" name="platform">
        <option value="Mobile App">Mobile App</option>
        <option value="Web App">Web App</option>
      </select>

      <textarea placeholder="Project Description" [(ngModel)]="formData.description" name="description"></textarea>

      <input type="file" (change)="onFileSelected($event)" />

      <button type="submit">Submit</button>
    </form>
  `
})
export class MaintenanceComponent {

  
  
 formData: any = {};
  selectedFile: File | null = null;
  scriptUrl = "https://script.google.com/macros/s/AKfycbzGL6vNz6lUrt6CYN6Wo_QCAVL9PuVUYmTF3KMHAoyg_2BagPxsb6idqAIp9xQjVfSFrg/exec";

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
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
      alert("Form submitted successfully!");

      this.formData = {}; // reset form
    });
}

}

