import { Component } from '@angular/core';
import { ChatbotComponent } from "./chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  imports: [ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbot-app';
}
