import { newE2EPage } from '@stencil/core/testing';

describe('cool-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cool-component></cool-component>');

    const element = await page.find('cool-component');
    expect(element).toHaveClass('hydrated');
  });
});
