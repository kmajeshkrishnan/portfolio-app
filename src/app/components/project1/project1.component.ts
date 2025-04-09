import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface ProcessImageResponse {
  success: boolean;
  image: string;
  num_instances: number;
  error?: string;
}

@Component({
  selector: 'app-project1',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="project1-container">
      <div class="header">
        <h1>Image Processing</h1>
        <p>Upload an image and let AI enhance it for you</p>
      </div>

      <div class="main-content">
        <!-- Upload Section -->
        <div class="upload-section">
          <div class="upload-box" 
               [class.dragover]="isDragover && !selectedFile"
               (dragover)="onDragOver($event)"
               (dragleave)="onDragLeave($event)"
               (drop)="onDrop($event)"
               [class.has-image]="selectedFile">
            <div class="upload-content" *ngIf="!selectedFile">
              <div class="upload-icon">📁</div>
              <p>Drag & drop your image here</p>
              <p class="sub-text">or</p>
              <button class="upload-btn" (click)="fileInput.click()">
                Choose Image
              </button>
              <input #fileInput 
                     type="file" 
                     accept=".jpg,.jpeg,.png"
                     (change)="onFileSelected($event)"
                     style="display: none">
              <p class="file-types">Supported formats: JPG, PNG (max 5MB)</p>
            </div>
            <div class="preview-content" *ngIf="selectedFile">
              <img [src]="previewUrl" alt="Preview">
              <button class="remove-btn" (click)="removeImage()">×</button>
            </div>
          </div>

          <!-- Process Button -->
          <button class="process-btn" 
                  [disabled]="!selectedFile || isProcessing"
                  (click)="processImage()">
            <span *ngIf="!isProcessing">Process Image</span>
            <span *ngIf="isProcessing" class="loading-spinner"></span>
          </button>
        </div>

        <!-- Result Section -->
        <div class="result-section" *ngIf="processedImageUrl">
          <h2>Processed Result</h2>
          <div class="result-card">
            <img [src]="showBefore ? previewUrl : processedImageUrl" 
                 alt="Processed Image"
                 (error)="handleImageError($event)"
                 class="result-image">
            <div class="result-info" *ngIf="numInstances !== null">
              <p>Number of instances detected: {{ numInstances }}</p>
            </div>
            <div class="result-actions">
              <button class="download-btn" (click)="downloadImage()">
                Download Result
              </button>
              <button class="toggle-btn" (click)="toggleBeforeAfter()">
                {{ showBefore ? 'Show After' : 'Show Before' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Messages -->
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .project1-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      min-height: calc(100vh - 60px - 60px);
      background-color: var(--background);
      color: var(--text-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      width: 100%;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
        font-size: 1.1rem;
      }
    }

    .main-content {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .upload-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
    }

    .upload-box {
      width: 100%;
      border: 2px dashed var(--accent);
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
      background-color: var(--card-background);
      transition: all 0.3s ease;
      cursor: pointer;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.dragover {
        background-color: var(--accent);
        border-color: var(--accent-hover);
        transform: scale(1.02);
      }

      &.has-image {
        border-style: solid;
        padding: 0;
        overflow: hidden;
      }

      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
      }

      .preview-content {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 300px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .remove-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;

          &:hover {
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
      }

      .upload-icon {
        font-size: 3rem;
      }

      .sub-text {
        color: var(--text-secondary);
        margin: 0.5rem 0;
      }

      .file-types {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .upload-btn, .process-btn, .download-btn, .toggle-btn {
      background-color: var(--accent);
      color: #000000;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 200px;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .result-section {
      width: 100%;
      text-align: center;

      h2 {
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }

      .result-card {
        background-color: var(--card-background);
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 1rem;

        img {
          width: 100%;
          height: auto;
          display: block;
          margin-bottom: 1rem;
        }

        .result-info {
          margin: 1rem 0;
          color: var(--text-secondary);
        }

        .result-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
      }
    }

    .error-message {
      color: #ff4444;
      background-color: rgba(255, 68, 68, 0.1);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
      width: 100%;
      max-width: 600px;
    }

    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #000000;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .project1-container {
        padding: 1rem;
      }

      .upload-box {
        min-height: 250px;
      }

      .preview-content {
        min-height: 250px;
      }
    }
  `]
})
export class Project1Component {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  processedImageUrl: string | null = null;
  isProcessing = false;
  isDragover = false;
  errorMessage: string | null = null;
  showBefore = false;
  numInstances: number | null = null;

  constructor(private http: HttpClient) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    if (!file.type.match(/image\/(jpeg|png)/)) {
      this.errorMessage = 'Please upload a valid image file (JPG or PNG)';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'File size should be less than 5MB';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.processedImageUrl = null;
    this.numInstances = null;
    this.errorMessage = null;
  }

  async processImage() {
    if (!this.selectedFile) return;

    this.isProcessing = true;
    this.errorMessage = null;

    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const response = await this.http.post<ProcessImageResponse>(
        'http://localhost:8000/process-image',
        formData,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      ).toPromise();
      
      if (response?.success) {
        try {
          // First decode the URL-encoded string
          const decodedBase64 = response.image;
          // Then create the data URL
          this.processedImageUrl = `data:image/jpeg;base64,${decodedBase64}`;
          this.numInstances = response.num_instances;
        } catch (decodeError) {
          console.error('Error decoding base64:', decodeError);
          this.errorMessage = 'Error processing image data. Please try again.';
        }
      } else {
        this.errorMessage = response?.error || 'Failed to process image';
      }
    } catch (error: any) {
      console.error('Error processing image:', error);
      
      if (error.status === 422) {
        const errorDetail = error.error?.detail?.[0]?.msg || 'Invalid image format';
        this.errorMessage = `Validation error: ${errorDetail}`;
      } else if (error.status === 413) {
        this.errorMessage = 'Image file is too large. Maximum size is 5MB.';
      } else if (error.status === 0) {
        this.errorMessage = 'Could not connect to the server. Please make sure the backend is running.';
      } else {
        this.errorMessage = 'An error occurred while processing the image. Please try again.';
      }
    } finally {
      this.isProcessing = false;
    }
  }

  downloadImage() {
    if (!this.processedImageUrl) return;

    const link = document.createElement('a');
    link.href = this.processedImageUrl;
    link.download = 'processed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  toggleBeforeAfter() {
    this.showBefore = !this.showBefore;
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    this.errorMessage = 'Error loading processed image. Please try again.';
  }
} 