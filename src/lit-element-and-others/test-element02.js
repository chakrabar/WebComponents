class TestElement02 extends HTMLElement {

    static get observedAttributes() {
        return ['collapsed'];
    }

    constructor() {
        super();

        this.name = 'World';
        this._collapsed = false;
        this.count = 0;
    }

    get collapsed() {
        return this._collapsed;
    }

    set collapsed(val) {
        this._collapsed = val;
        this.setAttribute('collapsed', val);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (attrName === 'collapsed') {
                this._collapsed = newValue?.toLowerCase() === 'true' ? true : false;
            }
        }
    }
    
    onClick = () => {
        this.count++;
        this.shadowRoot.querySelector('#clkBtn').innerHTML = `Click Count: ${this.count}`;
    }
    toggle = () => {
        this._collapsed = !this._collapsed;
        this.updateCollapsedState();
    }
    updateCollapsedState = () => {
        if (this.collapsed) {
            this.shadowRoot.querySelector('.box').classList.add('collapsed');
            this.shadowRoot.querySelector('#tglBtn').innerHTML = 'Expand ↓';
        } else {
            this.shadowRoot.querySelector('.box').classList.remove('collapsed');
            this.shadowRoot.querySelector('#tglBtn').innerHTML = 'Collapse ↑';
        }
    }
    syncName = (event) => {
        console.log(event);
        const nm = event.target.value;
        this.name = nm ? nm : 'World';
        this.shadowRoot.querySelector('h1').innerHTML = `Hello, ${this.name}!`;
    }

    connectedCallback() {

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
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
            </style>
            <h1>Hello, ${this.name}!</h1>
            Name: <input type="text" placeholder="${this.name}" />
            <button id="tglBtn" class="float-right">Collapse ↑</button>
            <div class="box">
                <button id="clkBtn">
                    Click Count: 0
                </button>
                <slot></slot>
            </div>
        `;

        this.shadowRoot.querySelector('#tglBtn').addEventListener('click', this.toggle);
        this.shadowRoot.querySelector('#clkBtn').addEventListener('click', this.onClick);
        this.shadowRoot.querySelector('input').addEventListener('input', this.syncName);

        this.updateCollapsedState();
    }
}

customElements.define('test-element02', TestElement02);