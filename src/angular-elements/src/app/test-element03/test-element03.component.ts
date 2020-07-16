import { Component, OnInit, ViewEncapsulation, Input, OnChanges, ElementRef, Output, EventEmitter } from '@angular/core';
import { ElementMetadata } from './elementMetadata';
import { CommandStore } from './commandStore';

@Component({
    selector: 'app-test-element03', // this is not really used
    templateUrl: './test-element03.component.html',
    styleUrls: ['./test-element03.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom, // ARGHYA: shadow dom will be used to encapsulate styles
})
export class TestElement03Component implements OnInit, OnChanges {

    constructor(
        private element: ElementRef,
    ) {
        // NOTE: IMP: ARGHYA: hack 101 for output property!!
        Object.defineProperty(this.element.nativeElement, 'result2', {
            get: () => { return new ElementMetadata(this.name, this.count); }, // This arrow is useful
            enumerable: true,
        });
    }

    public name = 'World';
    public count = 0;
    public amount = 1;

    private _commandStore: CommandStore;

    @Input()
    public collapsed = false;

    @Input()
    public metadata: ElementMetadata;

    @Input()
    public set commandStore(value: CommandStore) {
        this._commandStore = value;
    }

    @Input()
    public get result3(): ElementMetadata {
        return new ElementMetadata(this.name, this.count);
    }
    // NOTE: IMP: ARGHYA: hack 201 => using Input() to read data!!

    // @Output() // this is NOT accessible from outside
    public get result(): ElementMetadata {
        console.log('result property read');
        return new ElementMetadata(this.name, this.count);
    }
    public set result(value) { console.log(`result value set to ${value}`); }

    // just a test angular event output
    @Output()
    dataUpdate = new EventEmitter();

    ngOnInit() {
        console.log('Initializing with metadata');
        this._updateMetadata();
    }

    // this fires when property are set from outside in JS ??
    ngOnChanges() {
        console.log('Element property value updated');
        this._updateMetadata();
        this.dataUpdate.emit(new ElementMetadata(this.name, this.count));
    }
    // Should be done with a setter on metadata.
    // ngOnChanges() is better for watching multiple, interacting input properties
    // @Input()
    // set metadata(metadata: any) {
    //     this._updateMetadata(metadata);
    // }

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

    public increment(): void {
        this._commandStore.increment(this.amount);
    }

    public decrement(): void {
        this._commandStore.decrement(this.amount);
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
