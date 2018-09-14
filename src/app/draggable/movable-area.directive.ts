import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Subscription } from '../../../node_modules/rxjs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit {
  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];
  constructor(private area: ElementRef) {
    //element - ref element of the DOM element - MovableArea
  }
  //access to all movable elements inside this element (Movable Area)
  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log(`Number of elements in Movable Area: ${this.movables.length}`);
    //subscribe to drag event of movables
    this.movables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.movables.forEach(movable => {
        //measure the boundaries
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
      });
    })
    this.movables.notifyOnChanges();
  }
  public measureBoundaries(movable: MovableDirective): void {
    //measure boundaries where need bounding rect of this area and bounding rect of movable element

    //get MovableArea rects properties
    const viewRect: ClientRect = this.area.nativeElement.getBoundingClientRect();
    //get Movable Element rect properties
    const movableClientRect: ClientRect = movable.element.nativeElement.getBoundingClientRect();
    console.log(`Area properties: `, viewRect);
    console.log(`Movable element properties: `, movableClientRect);

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y
    };

    console.log('boundaries are: ', this.boundaries);

  }

  public maintainBoundaries(movable: MovableDirective): void {
    //maintain boundaries
    //movable.position - current position of the element
    //if Movable Element X is less than boundaries (Movable Area) X 
    //then position X of the movable Element = minX
    //movable.position.x = movable.position.x < this.boundaries.minX ? this.boundaries.minX : movable.position.x;

    //gives current element its own position or minX of the Area
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);

  }

}
