import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Overlay, OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appDraggableHelper]',
  exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy();
  private startPosition?: { x: number; y: number; };
  //DraggableDirector can be applied cuz Helper is its ancestor
  constructor(
    private draggable: DraggableDirective,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay) { }

  ngOnInit(): void {
    //If Drag Started in parent class, call local onDragStart method
    this.draggable.dragStart.subscribe((event) => this.onDragStart(event));
    this.draggable.dragMove.subscribe((event) => this.onDragMove(event));
    this.draggable.dragEnd.subscribe(() => this.onDragEnd());
    //Create an overlay
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    //remove the overlay
    this.overlayRef.dispose();
  }

  private onDragStart(event: PointerEvent): void {
    //Determine relative Start Position
    const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();
    this.startPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top
    }
  }

  private onDragMove(event: PointerEvent): void {
    if (!this.overlayRef.hasAttached()) {
      //Renders helper in the overlay
      //ViewContainerRef - Represents a container where one or more Views can be attached.
      //TemplateRef - Represents an Embedded Template that can be used to instantiate Embedded Views.
      //this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    }
    //Helper positioning
    this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    this.positionStrategy.apply();
  }

  private onDragEnd(): void {
    //Remove Helper
    //this.viewContainerRef.clear();
    this.overlayRef.detach();
  }
}
