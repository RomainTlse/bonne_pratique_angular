import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDistrictContent]'
})
export class DistrictContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
