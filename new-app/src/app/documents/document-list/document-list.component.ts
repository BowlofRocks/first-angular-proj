import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];

  @Input() selectedDocument?: Document;  

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }
  onSelectedDocument(document: Document): void {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
