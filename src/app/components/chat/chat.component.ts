import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { firstValueFrom } from 'rxjs';

interface Message {
  text: string;
  isUser: boolean;
}

interface RagResponse {
  response: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: false,
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages: Message[] = [];
  newMessage: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;
  private apiUrl: string = '/api/rag-query'; // Use relative URL that will be proxied by Nginx

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Add welcome message - ensure it's a string, not a Promise
    const welcomeMessage: Message = {
      text: 'Hello! I\'m your AI assistant. Feel free to ask me anything about Ajesh\'s experience, skills, or projects!',
      isUser: false
    };
    this.messages.push(welcomeMessage);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.loading) return;

    const userMessage = this.newMessage.trim();
    this.messages.push({
      text: userMessage,
      isUser: true
    });

    this.newMessage = '';
    this.loading = true;
    this.errorMessage = null;

    try {
      // Add a small delay to ensure the loading indicator is visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await firstValueFrom(
        this.http.post<RagResponse>(this.apiUrl, {
          query: userMessage
        })
      );

      // Debug the response
      console.log('Raw response:', response);
      
      // Extract the response text, handling different possible formats
      let botResponseText: string;
      
      if (typeof response === 'string') {
        botResponseText = response;
      } else if (response && typeof response === 'object') {
        if (response.response) {
          botResponseText = response.response;
        } else {
          // Try to stringify the entire response object
          botResponseText = JSON.stringify(response);
        }
      } else {
        botResponseText = 'Sorry, I received an unexpected response format.';
      }
      
      // Ensure it's a string
      if (typeof botResponseText !== 'string') {
        botResponseText = String(botResponseText);
      }
      
      console.log('Processed bot response:', botResponseText);
        
      this.messages.push({
        text: botResponseText,
        isUser: false
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      this.errorMessage = 'Sorry, there was an error processing your message. Please try again.';
      if (error.status === 0) {
        this.errorMessage = 'Could not connect to the server. Please make sure the backend is running.';
      }
    } finally {
      this.loading = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
} 