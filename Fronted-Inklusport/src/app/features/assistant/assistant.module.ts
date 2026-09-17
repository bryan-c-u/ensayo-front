import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AssistantRoutingModule } from './assistant-routing.module';

import { AssistantChatComponent } from './pages/assistant-chat/assistant-chat.component';
import { OrganizerAssistantComponent } from './pages/organizer-assistant/organizer-assistant.component';
import { AssistantWidgetComponent } from './components/assistant-widget/assistant-widget.component';

/**
 * M08 - Asistente Virtual Inteligente.
 * Chat, recomendaciones deportivas y organización de agendas / rutinas.
 */
@NgModule({
  declarations: [
    AssistantChatComponent,
    OrganizerAssistantComponent,
    AssistantWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AssistantRoutingModule
  ],
  exports: [
    AssistantWidgetComponent
  ]
})
export class AssistantModule { }
