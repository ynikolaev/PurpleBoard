import { Directive, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { SortableDirective } from './sortable.directive';

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  constructor() { }

  ngAfterContentInit() {
    console.log(`Got this number: ${this.sortables.length} of items`);
  }
}
