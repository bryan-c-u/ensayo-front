import { Component, OnInit } from '@angular/core';
import { AssistantMessage, AssistantService, SportRecommendation } from '../../services/assistant.service';

/**
 * M08 - Pantalla de chat del Asistente Virtual.
 * Es el destino real del botón "Hablar con IA" que antes hacía alert().
 */
@Component({
  selector: 'app-assistant-chat',
  templateUrl: './assistant-chat.component.html',
  styleUrl: './assistant-chat.component.scss'
})
export class AssistantChatComponent implements OnInit {
  messages: AssistantMessage[] = [];
  recommendations: SportRecommendation[] = [];
  draft = '';
  sending = false;

  constructor(private readonly assistant: AssistantService) {}

  ngOnInit(): void {
    this.messages.push({
      author: 'assistant',
      text: '¡Hola! Puedo recomendarte deportes adaptados y ayudarte a organizar tu agenda de eventos y rutinas.',
      at: new Date(),
    });
    this.assistant.getRecommendations().subscribe(recs => (this.recommendations = recs));
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.sending) {
      return;
    }
    this.messages.push({ author: 'user', text, at: new Date() });
    this.draft = '';
    this.sending = true;
    this.assistant.ask(text).subscribe(reply => {
      this.messages.push(reply);
      this.sending = false;
    });
  }
}
