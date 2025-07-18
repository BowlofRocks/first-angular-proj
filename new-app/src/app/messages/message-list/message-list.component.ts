import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service'; 

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []; 

  constructor(private messageService: MessageService) {} 

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe((updatedMessages: Message[]) => {
      this.messages = updatedMessages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
