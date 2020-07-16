import { newSpecPage } from '@stencil/core/testing';
import { CoolComponent } from './cool-component';

describe('cool-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CoolComponent],
      html: `<cool-component></cool-component>`,
    });
    expect(page.root).toEqualHtml(`
      <cool-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cool-component>
    `);
  });
});
