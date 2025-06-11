import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
@Injectable({
    providedIn: 'root'
})
export class ChatBotService{
    private http = inject(HttpClient);
    getAIResponse(userMsg: string){
        return this.http.post<any>('http://localhost:8080/api/chat', { question: userMsg });
    }
}
