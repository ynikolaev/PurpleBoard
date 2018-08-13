import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();
  constructor() { }

  @HostBinding('class.dragging') dragging = false;
  // (end) pointerdown => dragStart
  // (move) document => pointermove => dragMove
  // (start) dovument => pointerup => dragEnd

  @HostListener('pointerdown', ['$event']) onpointerdown(event: PointerEvent):void {
    this.dragging = true;
    event.stopPropagation();
    this.dragStart.emit(event);
    //console.log(`drag started`);
  }

  @HostListener('document:pointermove', ['$event']) onpointermove(event: PointerEvent):void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
    //console.log(`drag moved`);
  }

  @HostListener('document:pointerup', ['$event']) onpointerup(event: PointerEvent):void {
    if (!this.dragging) {
      return;
    }
    this.dragEnd.emit(event);
    //console.log(`drag released`);
    this.dragging = false;
  }
}
