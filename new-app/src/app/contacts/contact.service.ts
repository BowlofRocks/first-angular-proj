import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private maxContactId: number = 0;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  // ✅ Get max ID to generate unique IDs for new contacts
  private getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // ✅ Add a new contact
  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // ✅ Update an existing contact
  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;

    const index = this.contacts.indexOf(originalContact);
    if (index < 0) return;

    newContact.id = originalContact.id;
    this.contacts[index] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // ✅ Delete a contact
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const index = this.contacts.indexOf(contact);
    if (index < 0) return;

    this.contacts.splice(index, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
