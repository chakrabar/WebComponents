import { LitElement } from 'lit-element';
import { ElementMetadata } from './elementMetadata';
import { CommandStore } from './commandStore';
/**
 * An example element
 */
export declare class TestElement01 extends LitElement {
    static styles: import("lit-element").CSSResult;
    name: string;
    count: number;
    collapsed: boolean;
    private _metadata;
    private _commandStore;
    get metadata(): string;
    set metadata(value: string);
    set commandStore(value: CommandStore);
    get result(): ElementMetadata;
    render(): import("lit-element").TemplateResult;
    private _increment;
    private _decrement;
    private _onClick;
    private _toggle;
    private _syncName;
    private _updateMetadata;
    private _notify;
}
declare global {
    interface HTMLElementTagNameMap {
        'test-element01': TestElement01;
    }
}
//# sourceMappingURL=test-element01.d.ts.map