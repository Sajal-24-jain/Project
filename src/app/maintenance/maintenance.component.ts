import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
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
  isSubmitting = false;
  submitError: string | null = null;

  scriptUrl =
    'https://script.google.com/macros/s/AKfycbzGL6vNz6lUrt6CYN6Wo_QCAVL9PuVUYmTF3KMHAoyg_2BagPxsb6idqAIp9xQjVfSFrg/exec';

  constructor(private http: HttpClient) {}

  onNameInput() {
    if (this.formData.name) {
      this.formData.name = this.formData.name.replace(/[^A-Za-z ]/g, '');
    }
  }
submit(form: NgForm) {
  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z ]{2,}$/;

  // Validate each required field
  if (
    !this.formData.name ||
    !nameRegex.test(this.formData.name)
  ) {
    alert('Please enter a valid name (letters only, min 2 characters).');
    return;
  }

  if (!this.formData.email || !emailRegex.test(this.formData.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!this.formData.projectName) {
    alert('Project Name is required.');
    return;
  }

  if (!this.formData.projectTech) {
    alert('Project Tech is required.');
    return;
  }

  if (!this.formData.projectType) {
    alert('Please select a Project Type.');
    return;
  }

  if (!this.formData.platform) {
    alert('Please select a Platform.');
    return;
  }

  // If all validations pass, proceed with submission
  this.submitError = null;
  this.isSubmitting = true;
  const params = new URLSearchParams({
    name: this.formData.name,
    email: this.formData.email,
    projectName: this.formData.projectName,
    projectTech: this.formData.projectTech,
    projectType: this.formData.projectType,
    platform: this.formData.platform,
    description: this.formData.description || ''
  }).toString();

  const url = `${this.scriptUrl}?${params}`;
  // Try HttpClient POST first (CORS-enabled endpoint). Fallback to fetch GET no-cors if needed.
  const payload = {
    name: this.formData.name,
    email: this.formData.email,
    projectName: this.formData.projectName,
    projectTech: this.formData.projectTech,
    projectType: this.formData.projectType,
    platform: this.formData.platform,
    description: this.formData.description || ''
  };

  this.http.post(this.scriptUrl, payload).subscribe({
    next: () => {
      this.onSubmissionSuccess(form);
    },
    error: (err) => {
      // If CORS or other errors occur, attempt a no-cors GET as a last resort (still best-effort)
      console.warn('POST failed, falling back to fetch GET (no-cors)', err);
      fetch(url, { method: 'GET', mode: 'no-cors' })
        .then(() => this.onSubmissionSuccess(form))
        .catch((fetchErr) => {
          console.error('Submission failed', fetchErr);
          this.submitError = 'Submission failed. Please try again later.';
          this.isSubmitting = false;
        });
    }
  });
}

  private onSubmissionSuccess(form: NgForm) {
    this.showModal = true;
    this.formData = {
      name: '',
      email: '',
      projectName: '',
      projectTech: '',
      projectType: '',
      platform: '',
      description: ''
    };
    form.resetForm();
    this.isSubmitting = false;
    setTimeout(() => (this.showModal = false), 3000);
  }

  closeModal() {
    this.showModal = false;
  }
}
