import { LitElement, html, customElement, property, css } from 'lit-element';
import { ElementMetadata } from './elementMetadata';
import { CommandStore } from './commandStore';

/**
 * An example element
 */
@customElement('test-element01')
export class TestElement01 extends LitElement {
    static styles = css`
        :host {
            display: block;
            border: solid 1px gray;
            padding: 16px;
            max-width: 800px;
            color: var(--primary-color, darkgrey);
            background-color: var(--background-color, white);
            font-family: var(--font-family, sans-serif);
        }
        button {
            font-family: var(--font-family, sans-serif);
        }
        input {
            font-family: var(--font-family, sans-serif);
        }
        .box {
            padding: 10px;
        }
        .float-right {
            float: right;
        }
        div.collapsed {
            display: none;
        }
    `;

    @property()
    name = 'World';

    @property({ type: Number })
    count = 0;

    @property({ type: Boolean })
    collapsed = false;

    private _metadata = '';
    private _commandStore: CommandStore | undefined;

    @property() // {attribute: false} to make non-attribute BUT we do want to keep attribute too
    get metadata(): string {
        return this._metadata;
    }
    set metadata(value: string) { // when value of metadata is set from JS
        // const oldValue = this._metadata;
        this._metadata = value;
        // this.requestUpdate('metadata', oldValue);
        this._updateMetadata(); // this is actually object
    }

    @property({ attribute: false, type: CommandStore })
    set commandStore(value: CommandStore) { // when value of metadata is set from JS
        this._commandStore = value;
    }

    @property({ attribute: false, type: ElementMetadata })
    get result(): ElementMetadata {
        return new ElementMetadata(this.name, this.count);
    }

    render() {
        return html`
        <h1>Hello, ${this.name}!</h1>
        Name: <input type="text" @change=${this._notify} @input=${this._syncName} placeholder="${this.name}" />
        <button class="float-right" @click=${this._toggle}>${this.collapsed ? 'Expand ↓' : 'Collapse ↑'}</button>
        <div class="box ${this.collapsed ? 'collapsed' : ''}">
            <button @click=${this._onClick} part="button">
                Click Count: ${this.count}
            </button>
            <slot></slot>
            Update amount: <input id="amount" type="number" placeholder="0" />
            <button @click=${this._increment}>Increment</button>
            <button @click=${this._decrement}>Decrement</button>
        </div>
        `;
    }

    private _increment() {
        let amount = (this.shadowRoot?.querySelector('#amount') as HTMLInputElement).value;
        if (!amount) amount = '1';
        this._commandStore?.increment(parseInt(amount));
    }

    private _decrement() {
        let amount = (this.shadowRoot?.querySelector('#amount') as HTMLInputElement).value;
        if (!amount) amount = '1';
        this._commandStore?.decrement(parseInt(amount));
    }

    private _onClick() {
        this.count++;
    }

    private _toggle() {
        this.collapsed = !this.collapsed;
    }

    private _syncName(event: any) {
        const value: string = event.target.value;
        this.name = value ? value : 'World';
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

    private _notify(): void {
        const notifyEvent = new CustomEvent('data-update', { 
            detail: { 
                elementId: this.id,
                property: 'name',
                value: this.name,
            },
            bubbles: true, // go up the DOM
            composed: true, // go through ShadowDom
        });
        this.dispatchEvent(notifyEvent);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'test-element01': TestElement01;
    }
}
