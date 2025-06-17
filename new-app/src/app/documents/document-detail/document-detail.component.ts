import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../wind-ref.service'; // ✅ Import WindRefService

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;
  nativeWindow: any; // ✅ Declare nativeWindow property

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService // ✅ Inject WindRefService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });

    this.nativeWindow = this.windRefService.getNativeWindow(); // ✅ Get reference to window
  }

  onView(): void {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url, '_blank');
    }
  }

onDelete(): void {
  if (this.document) {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']); // Go back to the document list
  }
}

}
