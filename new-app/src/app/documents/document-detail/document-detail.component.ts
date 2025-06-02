import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'] // Note the plural "styleUrls"
})
export class DocumentDetailComponent {
  @Input() document!: Document;
}
