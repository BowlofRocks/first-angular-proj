import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Hello', 'This is the first message.', 'Alice'),
    new Message('2', 'Update', 'Don’t forget the meeting tomorrow.', 'Bob'),
    new Message('3', 'Reminder', 'Please review the document.', 'Charlie'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
