import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

export const collapse = [
    trigger('collapse', [
        state('init', style({ height: 0 })),
        state('off', style({ height: 0 })),
        state('on', style({ height: '*' })),
        transition('* => on', [animate('400ms cubic-bezier(.39,.8,.5,.95)')]),
        transition('on => off', [animate('400ms cubic-bezier(.39,.8,.5,.95)')]),
        transition('init => off', [animate('0s')])
    ])
];

export const SlideUpDownAnimation = [
    trigger('slideUpDown', [
        state('up', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('down', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('up => down', [group([
            animate('400ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('down => up', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '500px'
            })),
            animate('800ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),
];
