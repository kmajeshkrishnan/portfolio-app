import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Image Processing Project',
      description: 'A project that uses AI to process and enhance images.',
      image: 'assets/images/project1.jpg',
      technologies: ['Python', 'FastAPI', 'Angular', 'AI'],
      liveUrl: '/project1'
    }
  ];
} 