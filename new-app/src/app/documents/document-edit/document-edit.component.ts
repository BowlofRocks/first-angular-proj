import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = {
    id: '',
    name: '',
    description: '',
    url: '',
    children: []
  };
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      const doc = this.documentService.getDocument(id);
      if (!doc) {
        return;
      }

      this.originalDocument = doc;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(doc)); // deep copy to avoid mutating original
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const newDoc: Document = {
      ...this.document,
      name: form.value.name,
      description: form.value.description,
      url: form.value.url,
    };

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDoc);
    } else {
      this.documentService.addDocument(newDoc);
    }

    this.router.navigate(['/documents']);
  }

  onCancel(): void {
    this.router.navigate(['/documents']);
  }
}
