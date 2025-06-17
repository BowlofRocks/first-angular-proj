import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];

  // ✅ New EventEmitter for cross-component communication
documentChangedEvent = new EventEmitter<Document[]>();
documentSelectedEvent = new EventEmitter<Document>();



  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (let doc of this.documents) {
      if (doc.id === id) {
        return doc;
      }
    }
    return null;
  }

deleteDocument(document: Document): void {
  const index = this.documents.findIndex(doc => doc.id === document.id);
  if (index !== -1) {
    this.documents.splice(index, 1);
    this.documentChangedEvent.emit(this.documents.slice()); // Emit updated list
  }
}


}
