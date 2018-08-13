import { Directive } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective extends DraggableDirective {

  constructor() {
    super();
  }

}
