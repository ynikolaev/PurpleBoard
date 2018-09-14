import { Directive, OnInit, HostListener, HostBinding, ElementRef, Input, forwardRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '../../../node_modules/@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

interface PositionClient {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]',
  providers: [
    { provide: DraggableDirective, useExisting: forwardRef(() => MovableDirective) }
  ]
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  public position: Position = { x: 0, y: 0 };
  public positionClient: PositionClient = { x: 0, y: 0 };

  private startPosition: Position;

  @Input('appMovableReset') reset = false;

  constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
    //element - element of the DOM  - appMovable
    super(element);
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    //console.log(`on drag start position: x: ${event.clientX} and y: ${event.clientY}`)
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
    this.positionClient.x = event.clientX - this.position.x;
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (this.reset) {
      this.position = { x: 0, y: 0 };
    }
  }
}
