import { newSpecPage } from '@stencil/core/testing';
import { StencilComponent } from './stencil-component';

describe('stencil-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StencilComponent],
      html: `<stencil-component></stencil-component>`,
    });
    expect(page.root).toEqualHtml(`
      <stencil-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </stencil-component>
    `);
  });
});
