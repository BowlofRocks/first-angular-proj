import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model'; // Update this path if needed

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    let filteredContacts: Contact[] = [];

    // Only filter if the search term is valid
    if (term && term.length > 0) {
      filteredContacts = contacts.filter(
        (contact: Contact) =>
          contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // If no matches were found, return the original list
    if (filteredContacts.length < 1) {
      return contacts;
    }

    // Otherwise, return the filtered results
    return filteredContacts;
  }
}
