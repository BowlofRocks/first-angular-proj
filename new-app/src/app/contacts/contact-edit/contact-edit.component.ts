import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact | null;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', []);
        this.groupContacts = [];
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        this.router.navigate(['/contacts']);
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact)); // deep clone
      this.groupContacts = this.contact.group
        ? JSON.parse(JSON.stringify(this.contact.group))
        : [];
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const newContact = new Contact(
      this.editMode ? this.contact.id : '',
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imageUrl,
      this.groupContacts
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact!, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number): void {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }

  // Called on drag-drop event
  onDrop(event: CdkDragDrop<Contact[]>): void {
    this.addToGroup(event);
  }

  // Check if the contact to add is invalid (already in group or same as main contact)
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  // Adds dragged contact to groupContacts if valid
  addToGroup($event: any): void {
    const selectedContact: Contact = $event.item.data;
    if (this.isInvalidContact(selectedContact)) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }
}
