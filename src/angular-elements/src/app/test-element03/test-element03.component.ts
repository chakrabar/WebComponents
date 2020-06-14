import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'app-test-element03', // this is not really used
    templateUrl: './test-element03.component.html',
    styleUrls: ['./test-element03.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom, // ARGHYA: shadow dom will be used to encapsulate styles
})
export class TestElement03Component implements OnInit {

    constructor() { }

    public name = 'World';
    public count = 0;

    @Input()
    public collapsed = false;

    // @HostBinding('attr.selected')
    // public isActive: boolean;

    ngOnInit() { }

    public onClick() {
        this.count++;
    }

    public toggle() {
        this.collapsed = !this.collapsed;
    }

    public syncName(value: string) {
        this.name = value ? value : 'World';
    }

    // @HostListener('click')
    // public onHostClick($event: any) {
    //     console.log(`test-element03 clicked: ${$event}`)
    // }
}
