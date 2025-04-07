import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about">
      <div class="container">
        <h1>About Me</h1>
        <div class="content">
          <div class="bio">
            <h2>Who I Am</h2>
            <p>I'm a passionate developer with expertise in modern web technologies. I love creating beautiful and functional applications that solve real-world problems.</p>
          </div>
          <div class="skills">
            <h2>My Skills</h2>
            <div class="skill-tags">
              <span class="skill-tag">Angular</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">HTML/CSS</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Git</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {} 