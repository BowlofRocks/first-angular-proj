import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  private isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    event.preventDefault(); // Prevent link navigation
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');
    }
  }
}
