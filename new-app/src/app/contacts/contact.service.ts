import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private maxContactId: number = 0;

  // 🔗 Firebase Realtime Database endpoint for contacts
  private firebaseUrl: string = 'https://full-stack-amago-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {}

  // 🔁 HTTP GET: Fetch contacts from Firebase
  getContacts(): void {
    this.http.get<Contact[]>(this.firebaseUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts ?? [];
        this.maxContactId = this.getMaxId();

        // Sort alphabetically
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));

        // Notify listeners
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(c => c.id === id) || null;
  }

  // 🔢 Get the max ID (for new contact IDs)
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

  // 💾 HTTP PUT: Store contacts to Firebase
  storeContacts(): void {
    this.http.put(this.firebaseUrl, this.contacts).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => {
        console.error('Error saving contacts:', error);
      }
    );
  }

  // ➕ Add contact and persist
  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts();
  }

  // ✏️ Update contact and persist
  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;

    const index = this.contacts.indexOf(originalContact);
    if (index < 0) return;

    newContact.id = originalContact.id;
    this.contacts[index] = newContact;

    this.storeContacts();
  }

  // ❌ Delete contact and persist
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index < 0) return;

    this.contacts.splice(index, 1);

    this.storeContacts();
  }
}
