import { Component, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatBotService } from './chatbot.service';
import { IMessage } from './chatbot.modal';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  title= signal('ECHO – Enterprise Chatbot for Help & Operations');
  messages = signal<IMessage[]>([
    { sender: 'bot', text: 'Hello! How can I help you?' }
  ]);
  userInput = '';
  loading = false;

  constructor(
    private chatbotService: ChatBotService,
    private zone: NgZone
  ) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.set([...this.messages(),{ sender: 'user', text: userMsg }]);
    const botMsg = { sender: 'bot', text: '' };
    this.messages.set([...this.messages(),botMsg]);

    this.loading = true;
    this.userInput = '';

    const es = this.chatbotService.getStreamedAIResponse(userMsg);

    es.onmessage = (event) => {
      this.zone.run(() => {
        botMsg.text += event.data +  ' ' ;
      });
    };

    es.onerror = () => {
      this.zone.run(() => {
        this.loading = false;
        if (!botMsg.text) {
          botMsg.text = 'Sorry, something went wrong.';
        }
      });
      es.close();
    };

    es.addEventListener('end', () => {
      this.zone.run(() => {
        this.loading = false;
      });
      es.close();
    });

  }
}
