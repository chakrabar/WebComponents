import { LitElement, html, customElement, property, css } from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
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

    render() {
        return html`
        <h1>Hello, ${this.name}!</h1>
        Name: <input type="text" @input=${this._syncName} placeholder="${this.name}" />
        <button class="float-right" @click=${this._toggle}>${this.collapsed ? 'Expand ↓' : 'Collapse ↑'}</button>
        <div class="box ${this.collapsed ? 'collapsed' : ''}">
            <button @click=${this._onClick} part="button">
                Click Count: ${this.count}
            </button>
            <slot></slot>
        </div>
        `;
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

    _updateMetadata(): void {
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
}

declare global {
    interface HTMLElementTagNameMap {
        'test-element01': TestElement01;
    }
}
