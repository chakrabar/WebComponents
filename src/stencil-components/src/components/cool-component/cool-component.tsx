import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
    tag: 'cool-component',
    styleUrl: 'cool-component.css',
    shadow: true,
})
export class CoolComponent implements ComponentInterface {

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
