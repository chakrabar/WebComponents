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
}

declare global {
    interface HTMLElementTagNameMap {
        'test-element01': TestElement01;
    }
}
