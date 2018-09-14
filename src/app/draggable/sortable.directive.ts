import { Directive, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appSortable]',
  providers: [
    { provide: DraggableDirective, useExisting: SortableDirective }
  ]
})
export class SortableDirective extends DraggableDirective {
  @HostBinding("class.sortable") sortable = true;
  
}
