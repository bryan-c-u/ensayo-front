import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';
import { AssistantChatComponent } from './pages/assistant-chat/assistant-chat.component';
import { OrganizerAssistantComponent } from './pages/organizer-assistant/organizer-assistant.component';

const routes: Routes = [
  { path: '', component: AssistantChatComponent },
  {
    path: 'organizer',
    component: OrganizerAssistantComponent,
    canActivate: [roleGuard],
    data: { roles: ['ORGANIZADOR'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantRoutingModule { }
