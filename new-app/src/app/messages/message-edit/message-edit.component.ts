import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'] 
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Paul Amago'; 

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    const newMessage = new Message(Date.now().toString(), subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);

    // Clear inputs after sending
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
