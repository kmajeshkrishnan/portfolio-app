import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="resume">
      <div class="container">
        <h1>Resume</h1>
        
        <div class="resume-content">
          <div class="section education">
            <h2>Education</h2>
            <div class="timeline">
              <div class="timeline-item">
                <div class="date">2018 - 2022</div>
                <div class="content">
                  <h3>Bachelor of Computer Science</h3>
                  <p class="institution">University Name</p>
                  <p class="description">Relevant coursework in Software Engineering, Web Development, and Database Systems.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="section experience">
            <h2>Experience</h2>
            <div class="timeline">
              <div class="timeline-item">
                <div class="date">2022 - Present</div>
                <div class="content">
                  <h3>Senior Frontend Developer</h3>
                  <p class="institution">Company Name</p>
                  <ul class="responsibilities">
                    <li>Led development of multiple web applications using Angular and TypeScript</li>
                    <li>Implemented responsive designs and modern UI components</li>
                    <li>Collaborated with backend team for API integration</li>
                  </ul>
                </div>
              </div>

              <div class="timeline-item">
                <div class="date">2020 - 2022</div>
                <div class="content">
                  <h3>Web Developer</h3>
                  <p class="institution">Previous Company</p>
                  <ul class="responsibilities">
                    <li>Developed and maintained client websites</li>
                    <li>Optimized applications for maximum speed and scalability</li>
                    <li>Participated in code reviews and team meetings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="section skills">
            <h2>Technical Skills</h2>
            <div class="skills-grid">
              <div class="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>Angular</li>
                  <li>TypeScript</li>
                  <li>HTML5/CSS3</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div class="skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div class="skill-category">
                <h3>Tools</h3>
                <ul>
                  <li>Git</li>
                  <li>VS Code</li>
                  <li>Docker</li>
                  <li>Jira</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="download-section">
            <a href="#" class="btn btn-primary">Download PDF</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {} 