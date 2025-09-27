// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-about',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.scss']
// })
// export class AboutComponent {
//   techStack = ['Angular', 'Node.js', 'MongoDB', 'AWS'];

//   // Using a Picsum image
//   imageUrl = 'https://picsum.photos/400/300';
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,               // ✅ standalone component
  imports: [CommonModule],        // ✅ import NgFor, NgIf, etc.
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  techList = [
    { name: 'Mobile', icon: '📱' },
    { name: 'React', icon: '⚛️' },
    { name: 'Backend', icon: '💻' },
    { name: 'Database', icon: '🗄️' },
    { name: 'Vue.js', icon: '🟩' },
    { name: 'Frontend', icon: '🖥️' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Cloud & Devops', icon: '☁️' }
  ];
}
