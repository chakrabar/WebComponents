import { Component, OnInit, ViewEncapsulation, Input, OnChanges, ElementRef } from '@angular/core';
import { ElementMetadata } from './elementMetadata';

@Component({
    selector: 'app-test-element03', // this is not really used
    templateUrl: './test-element03.component.html',
    styleUrls: ['./test-element03.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom, // ARGHYA: shadow dom will be used to encapsulate styles
})
export class TestElement03Component implements OnInit, OnChanges {

    constructor(
        private element: ElementRef,
    ) { }

    public name = 'World';
    public count = 0;

    @Input()
    public collapsed = false;

    @Input()
    public metadata: ElementMetadata;

    ngOnInit() {
        console.log('Initializing with metadata')
        this._updateMetadata();
    }

    ngOnChanges() {
        console.log('Element property value updated')
        this._updateMetadata();
    }

    private _updateMetadata(): void {
        if (this.metadata) {
            const parsedMetadata = typeof this.metadata === 'string'
                ? JSON.parse(this.metadata)
                : this.metadata;
            if (parsedMetadata) {
                this.count = parsedMetadata.count;
                this.name = parsedMetadata.name;
            } else {
                console.error(`Invalid metadata value!`);
                console.error(this.metadata);
            }
        }
    }

    public onClick(): void {
        this.count++;
    }

    public toggle(): void {
        this.collapsed = !this.collapsed;
    }

    public syncName(value: string): void {
        this.name = value ? value : 'World';
    }

    // Well, this is not very Angular TBH
    public notify(): void {
        const notifyEvent = new CustomEvent('data-update', {
            detail: {
                elementId: this.element.nativeElement.id,
                property: 'name',
                value: this.name,
            },
            bubbles: true, // go up the DOM
            composed: true, // go through ShadowDom
        });
        this.element.nativeElement.dispatchEvent(notifyEvent);
    }

    // @HostBinding('attr.selected')
    // public isActive: boolean;

    // @HostListener('click')
    // public onHostClick($event: any) {
    //     console.log(`test-element03 clicked: ${$event}`)
    // }
}
