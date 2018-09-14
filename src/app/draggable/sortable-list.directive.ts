import { Directive, ContentChildren, AfterContentInit, QueryList, Output, EventEmitter } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { SortableDirective } from './sortable.directive';

export interface SortEvent {
  currentIndex: number,
  newIndex: number
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  )
}

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {

  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;
  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];

  constructor() { }

  ngAfterContentInit() {
    console.log(`Got this number: ${this.sortables.length} of items`);
    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => {
        this.measureClientRect();
      });
      sortable.dragMove.subscribe((event) => {
        this.detectSorting(sortable, event);
      });
    })
  }

  measureClientRect(): void {
    //console.log(`measure`);
    //element - is draggable (and now sortable) element
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  detectSorting(sortable: SortableDirective, event: PointerEvent): void {
    //console.log(`detect`);
    //sort them by distance to current sortable
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];
    //slice - returns a copy of original array
    //sort - sorts elements, requires compare function
    this.clientRects
      .slice()
      .sort((rectA, rectB) => {
        //sort by distance to current rect
        return distance(rectA, currentRect) - distance(rectB, currentRect);
      })
      .some(rect => {
        //find the first rect hat needed to swap with 
        if (rect === currentRect) {
          return false;
        }
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? rect.left < currentRect.left : rect.top < currentRect.top;

        let moveBack = false;
        let moveForward = false;

        if (isHorizontal) {
          moveBack = isBefore && event.clientX < rect.left + rect.width / 2;
          moveForward = !isBefore && event.clientX > rect.left + rect.width / 2;
        } else {
          moveBack = isBefore && event.clientY < rect.top + rect.height / 2;
          moveForward = !isBefore && event.clientY > rect.top + rect.height / 2;
        }

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });
          return true;
        }
        //stop moving
        return false;
      })

  }
}
