import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { SortableDirective } from './sortable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, MovableDirective, SortableListDirective, SortableDirective],
  exports: [DraggableDirective, MovableDirective, SortableListDirective, SortableDirective]
})
export class DraggableModule { }
