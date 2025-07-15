import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription!: Subscription;

  term: string = ''; // For search box

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // 🟡 Call getContacts(), let the service emit results when ready
    this.contactService.getContacts();

    // 🟢 Subscribe to contact updates
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // 🔍 Search handler
  search(value: string) {
    this.term = value;
  }
}
