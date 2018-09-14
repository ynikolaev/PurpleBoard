import { Directive, HostBinding, HostListener, Output, EventEmitter, ViewContainerRef, ContentChild, ElementRef } from '@angular/core';
import { DraggableHelperDirective } from './draggable-helper.directive';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragged') dragged = false;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  //Not @Input, cuz Helper is its content
  //@ContentChild(DraggableHelperDirective) helper: DraggableHelperDirective;
  constructor(public element: ElementRef) { }
  // viewContainerRef - Location of current directive in the view
  // (end) pointerdown => dragStart
  // (move) document => pointermove => dragMove
  // (start) dovument => pointerup => dragEnd

  @HostListener('pointerdown', ['$event']) onpointerdown(event: PointerEvent): void {
    this.dragging = true;
    this.dragged = true;
    event.stopPropagation(); //doesn't let parent element to be dragged
    this.dragStart.emit(event);
    //console.log(`drag started`);

    // render helper
    //The container can contain two kinds of Views. Host Views, created by instantiating a Component via
    //createComponent, and Embedded Views, created by instantiating an Embedded Template via createEmbeddedView.
    //this.helper.onDragStart();
  }

  @HostListener('document:pointermove', ['$event']) onpointermove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
    //console.log(`drag moved`);
  }

  @HostListener('document:pointerup', ['$event']) onpointerup(event: PointerEvent): void {
    this.dragged = false;
    if (!this.dragging) {
      return;
    }
    this.dragEnd.emit(event);
    //console.log(`drag released`);
    this.dragging = false;

    //remove helper
    //this.helper.onDragEnd();
  }
}
