import { newE2EPage } from '@stencil/core/testing';

describe('stencil-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<stencil-component></stencil-component>');

    const element = await page.find('stencil-component');
    expect(element).toHaveClass('hydrated');
  });
});
