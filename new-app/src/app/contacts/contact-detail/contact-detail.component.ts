import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);

      if (!this.contact) {
        // Navigate back to contacts list if contact not found
        this.router.navigate(['/contacts']);
      }
    });
  }

  onDelete(): void {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      // Navigate back to contact list after deletion
      this.router.navigate(['/contacts']);
    }
  }
}
