import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number = 0;

  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  // Replace this URL with your actual Firebase Realtime Database URL
  private firebaseUrl: string = 'https://full-stack-amago-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {}

  // 🔁 Fetch documents from Firebase using HTTP GET
  getDocuments() {
    this.http.get<Document[]>(this.firebaseUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents ?? [];
        this.maxDocumentId = this.getMaxId();

        // Sort by name
        this.documents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        // Notify listeners
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  // 📝 Save documents to Firebase using HTTP PUT
  storeDocuments() {
    this.http.put(this.firebaseUrl, this.documents).subscribe(
      () => {
        console.log('Documents saved successfully.');
      },
      (error) => {
        console.error('Error saving documents:', error);
      }
    );
  }

  getDocument(id: string): Document | null {
    for (let doc of this.documents) {
      if (doc.id === id) {
        return doc;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const doc of this.documents) {
      const currentId = parseInt(doc.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.documentListChangedEvent.next(this.documents.slice());

    // Save to Firebase
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.documentListChangedEvent.next(this.documents.slice());

    // Save to Firebase
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    const index = this.documents.findIndex(doc => doc.id === document.id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.documentListChangedEvent.next(this.documents.slice());

      // Save to Firebase
      this.storeDocuments();
    }
  }
}
