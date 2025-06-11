import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  messages = [
    { sender: 'bot', text: 'Hello! How can I help you?' }
  ];
  userInput = '';
  loading = false;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim()) {
      const userMsg = this.userInput;
      this.messages.push({ sender: 'user', text: userMsg });
      this.loading = true;
      this.http.post<any>('http://localhost:8080/api/chat', { message: userMsg })
        .subscribe({
          next: (res) => {
            this.messages.push({ sender: 'bot', text: res.response });
            this.loading = false;
          },
          error: () => {
            this.messages.push({ sender: 'bot', text: 'Sorry, there was an error.' });
            this.loading = false;
          }
        });
      this.userInput = '';
    }
  }
}
