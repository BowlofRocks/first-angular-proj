import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = new Contact('', '', '', '', '', []); // default blank form
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
      this.editMode = !!this.id;

      if (this.editMode) {
        const existingContact = this.contactService.getContact(this.id);
        if (existingContact) {
          this.contact = { ...existingContact }; // clone to avoid editing original directly
        } else {
          this.router.navigate(['/contacts']);
        }
      }
    });
  }

  onSubmit(form: NgForm): void {
    const newContact = new Contact(
      this.contact.id,            // keep the same id for updates or blank for new
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imageUrl,
      this.contact.group         // keep existing group or empty array for new contact
    );

    if (this.editMode) {
      this.contactService.updateContact(this.contact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
