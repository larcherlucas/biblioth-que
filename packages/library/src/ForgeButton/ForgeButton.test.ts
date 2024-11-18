import { render, fireEvent } from '@testing-library/vue';
import ForgeButton from './ForgeButton.vue';

describe('ForgeButton', () => {
  it('renders button with correct text', () => {
    const { getByText } = render(ForgeButton, { slots: { default: 'Click Me' } });
    expect(getByText('Click Me')).toBeDefined();
  });

  it('applies the correct variant class', () => {
    const { getByText } = render(ForgeButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secondary Button' },
    });
    const button = getByText('Secondary Button');
    expect(button.classList.contains('secondary')).toBe(true);
  });

  it('emits click event when button is clicked', async () => {
    const { getByText, emitted } = render(ForgeButton, {
      slots: { default: 'Click Me' },
    });
    const button = getByText('Click Me');
    await fireEvent.click(button);
    expect(emitted()).toHaveProperty('click');
  });

  it('does not emit click event when button is disabled', async () => {
    const { getByText, emitted } = render(ForgeButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
    });
    const button = getByText('Disabled Button');
    await fireEvent.click(button);
    expect(emitted()).not.toHaveProperty('click');
  });

  it('renders the button as disabled when prop is set', () => {
    const { getByText } = render(ForgeButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
    });
    const button = getByText('Disabled Button');
    expect(button).toBeDisabled();
  });
});
