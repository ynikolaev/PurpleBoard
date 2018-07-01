import { animate, animation, style } from '@angular/animations';

export var pageAnimation = animation([
    style({ opacity: 0 }),
    animate('800ms ease-in-out', style({ opacity: 1 })),
])