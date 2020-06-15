import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { ElementMetadata } from './elementMetadata';

@Component({
    selector: 'app-test-element03', // this is not really used
    templateUrl: './test-element03.component.html',
    styleUrls: ['./test-element03.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom, // ARGHYA: shadow dom will be used to encapsulate styles
})
export class TestElement03Component implements OnInit, OnChanges {

    constructor() { }

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

    // @HostBinding('attr.selected')
    // public isActive: boolean;

    // @HostListener('click')
    // public onHostClick($event: any) {
    //     console.log(`test-element03 clicked: ${$event}`)
    // }
}
