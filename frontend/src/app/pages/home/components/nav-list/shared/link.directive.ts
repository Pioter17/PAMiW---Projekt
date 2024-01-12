import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[AppActiveLink]',
  standalone: true
})
export class ActiveLinkDirective implements OnInit {

  @Input() routerLink: string;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);

  ngOnInit() {
    this.checkAndChange();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.checkAndChange(); // Sprawdź i zmień po każdej zmianie routingu
    });
  }

  private checkAndChange(){
    const currentUrl = this.router.url;

    if (currentUrl == this.routerLink) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

}
