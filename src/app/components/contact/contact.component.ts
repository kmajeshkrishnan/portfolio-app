import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact">
      <div class="container">
        <div class="contact-header">
          <h2>Get in Touch</h2>
          <p>Have a question or want to work together? I'd love to hear from you.</p>
        </div>

        <div class="contact-content">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h3>Send a Message</h3>
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  [(ngModel)]="formData.subject" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  [(ngModel)]="formData.message" 
                  required
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="!contactForm.valid">
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-section">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div class="info-content">
                  <h4>Email</h4>
                  <a href="mailto:your.email&#64;example.com">your.email&#64;example.com</a>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <div class="info-content">
                  <h4>Phone</h4>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
              </div>
            </div>

            <div class="social-links">
              <h3>Connect With Me</h3>
              <div class="social-icons">
                <a href="https://github.com/yourusername" target="_blank" class="social-icon">
                  <i class="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-icon">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    .contact {
      padding: 4rem 2rem;
      background-color: var(--background);
      min-height: calc(100vh - 60px - 60px);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 5rem;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .contact-form-section {
      h2 {
        text-align: center;
        margin-bottom: 3rem;
        color: var(--text-primary);
        font-size: 2.5rem;
      }

      h3 {
        text-align: center;
        margin-bottom: 3rem;
      }

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--card-background);
          color: var(--text-primary);
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.1);
          }

          &::placeholder {
            color: var(--text-secondary);
          }
        }
      }

      .btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 2rem;
        background-color: var(--accent);
        color: #000000 !important;
        border: none;
        border-radius: 6px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          background-color: var(--accent-hover);
          color: #000000 !important;
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }
    }

    .contact-info-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }

      .contact-info {
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;

          i {
            font-size: 1.5rem;
            color: var(--accent);
          }

          .info-content {
            h4 {
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              color: var(--text-primary);
              margin-bottom: 0.25rem;
            }

            a {
              font-family: 'Poppins', sans-serif;
              color: var(--text-secondary);
              text-decoration: none;
              transition: color 0.3s ease;

              &:hover {
                color: var(--accent);
              }
            }
          }
        }
      }

      .social-links {
        .social-icons {
          display: flex;
          gap: 1rem;

          .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background-color: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            color: var(--text-primary);
            font-size: 1.25rem;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-2px);
              background-color: var(--accent);
              color: var(--text-light);
              border-color: var(--accent);
            }
          }
        }
      }
    }

    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .contact {
        padding: 2rem 1rem;
      }

      .contact-header {
        h1 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.1rem;
        }
      }

      .contact-form-section,
      .contact-info-section {
        h2 {
          font-size: 1.5rem;
        }
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    // Reset form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
} 