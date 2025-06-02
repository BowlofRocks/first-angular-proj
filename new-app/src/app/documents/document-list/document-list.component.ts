import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Document } from '../document.model'; // Make sure this path matches your folder structure

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'] // Make sure it's plural: "styleUrls"
})
export class DocumentListComponent {
  // Emits when a document is selected
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  @Input() selectedDocument?: Document;

  // Dummy document list
  documents: Document[] = [
    new Document('1', 'Angular Docs', 'Official documentation for Angular', 'https://angular.io'),
    new Document('2', 'TypeScript Docs', 'Learn all about TypeScript', 'https://www.typescriptlang.org/docs'),
    new Document('3', 'RxJS Docs', 'Reactive programming with RxJS', 'https://rxjs.dev'),
    new Document('4', 'MDN Web Docs', 'Great resource for web technologies', 'https://developer.mozilla.org'),
    new Document('5', 'StackBlitz', 'Online IDE for Angular', 'https://stackblitz.com')
  ];

  // Called when a document is clicked
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
