import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  getStreamedAIResponse(userMsg: string): EventSource {
    const params = new URLSearchParams({question: userMsg});
    return new EventSource(`http://localhost:8080/api/chat/stream?${params.toString()}`);
  }
}
