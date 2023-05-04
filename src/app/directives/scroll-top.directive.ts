import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTop]'
})
export class ScrollTopDirective {
  constructor() { }

  @HostListener('click')
  public onClick() {
    document.body.scroll(0, 0)
    if (window && window.scrollY) {
      window.scroll(0, 0);
    }
    else if (document.querySelector('.main-panel')) {
      document.querySelector('.main-panel').scroll(0, 0)
    }
  }
}
