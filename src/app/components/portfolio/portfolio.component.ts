import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="portfolio">
      <!-- Header Section -->
      <div class="header">
        <h2>Things I've Built</h2>
        <p class="subtitle">A collection of projects showcasing my expertise in web development, AI, and creative problem-solving.</p>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <!-- Project 1 -->
        <div class="project-card">
          <div class="project-image">
           <div class="project-image">
          <!-- Add project image here -->
        </div>
            <div class="project-overlay">
              <div class="project-links">
                <a [routerLink]="['/project1']" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
                <a href="https://github.com/yourusername/project1" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                  Code
                </a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>AI Image Processing</h3>
            <p>An intelligent system that enhances and transforms images using advanced AI algorithms.</p>
            <div class="project-tags">
              <span class="tag">Python</span>
              <span class="tag">FastAPI</span>
              <span class="tag">Angular</span>
              <span class="tag">AI</span>
            </div>
            <div class="project-links">
              <a [routerLink]="['/project1']" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                View Live
              </a>
              <a href="https://github.com/yourusername/project1" target="_blank" class="btn btn-secondary">
                <i class="fab fa-github"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <div class="project-image">
            <div class="project-overlay">
              <div class="project-links">
                <a href="#" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
                <a href="https://github.com/yourusername/project2" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                  Code
                </a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>Full Stack Platform</h3>
            <p>A modern web application with real-time features and seamless user experience.</p>
            <div class="project-tags">
              <span class="tag">Node.js</span>
              <span class="tag">Express</span>
              <span class="tag">React</span>
              <span class="tag">MongoDB</span>
            </div>
            <div class="project-links">
              <a href="#" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                View Live
              </a>
              <a href="https://github.com/yourusername/project2" target="_blank" class="btn btn-secondary">
                <i class="fab fa-github"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="project-card">
          <div class="project-image">
            <div class="project-overlay">
              <div class="project-links">
                <a href="#" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
                <a href="https://github.com/yourusername/project3" target="_blank" class="project-link">
                  <i class="fab fa-github"></i>
                  Code
                </a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>Responsive Design System</h3>
            <p>A comprehensive design system built for modern web applications.</p>
            <div class="project-tags">
              <span class="tag">HTML</span>
              <span class="tag">CSS</span>
              <span class="tag">JavaScript</span>
              <span class="tag">Responsive</span>
            </div>
            <div class="project-links">
              <a href="#" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                View Live
              </a>
              <a href="https://github.com/yourusername/project3" target="_blank" class="btn btn-secondary">
                <i class="fab fa-github"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

    .portfolio {
      padding: 4rem 2rem;
      background-color: var(--background);
      min-height: calc(100vh - 60px - 60px);
    }
          .project-image {
      height: 200px;
      background: linear-gradient(45deg, var(--background-alt), var(--accent));
      width: 100%;
      object-fit: cover;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;

      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 3.5rem;
        color: var(--text-primary);
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 1.25rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
    }

    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
      padding: 0 1rem;

      .filter-btn {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.5rem 1.5rem;
        border: none;
        background: none;
        color: var(--text-secondary);
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        &:hover, &.active {
          color: var(--text-primary);
          
          &::after {
            transform: scaleX(1);
          }
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .project-card {
      background-color: var(--card-background);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      border: 1px solid var(--border-color);

      &:hover {
        transform: translateY(-5px);

        .project-overlay {
          opacity: 1;
        }
      }

      .project-image {
        position: relative;
        width: 100%;
        padding-top: 75%; // 4:3 aspect ratio
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(13, 27, 42, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;

          .project-links {
            display: flex;
            gap: 1rem;

            .project-link {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.75rem 1.5rem;
              background-color: var(--accent);
              color: #000000 !important;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                background-color: var(--accent-hover);
                color: #000000 !important;
              }

              i {
                font-size: 1.1rem;
              }
            }
          }
        }
      }

      .project-content {
        padding: 1.5rem;

        h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-primary);
    font-size: 2.5rem;
        }

        p {
          font-family: 'Inter', sans-serif;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;

          .tag {
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            padding: 0.25rem 0.75rem;
            background-color: var(--accent);
            color: #000000 !important;
            border-radius: 16px;
          }
        }

        .project-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;

          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;

            i {
              font-size: 1.1rem;
            }

            &.btn-primary {
              background-color: var(--accent);
              color: #000000 !important;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                background-color: var(--accent-hover);
                color: #000000 !important;
              }
            }

            &.btn-secondary {
              background-color: var(--card-background);
              border: 1px solid var(--border-color);

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                background-color: var(--background);
                color: #000000 !important;
              }
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .portfolio {
        padding: 2rem 1rem;
      }

      .header {
        h1 {
          font-size: 2.5rem;
        }

        .subtitle {
          font-size: 1.1rem;
        }
      }

      .filter-tabs {
        gap: 0.5rem;
        margin-bottom: 2rem;

        .filter-btn {
          padding: 0.4rem 1rem;
          font-size: 0.9rem;
        }
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .project-content {
        .project-links {
          flex-direction: column;
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }
  `]
})
export class PortfolioComponent {} 