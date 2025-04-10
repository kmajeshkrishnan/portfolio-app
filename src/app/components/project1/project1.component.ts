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
  templateUrl: './project1.component.html',
  styleUrls: ['./project1.component.scss']
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