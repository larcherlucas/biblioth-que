import { render, fireEvent } from '@testing-library/vue';
import ForgeInput from './ForgeInput.vue';

describe('ForgeInput', () => {
  it('renders label and input field', () => {
    const { getByLabelText } = render(ForgeInput, { props: { label: 'Name' } });
    expect(getByLabelText('Name')).toBeDefined();
  });

  it('updates value on input', async () => {
    const { getByLabelText, emitted } = render(ForgeInput, {
      props: { label: 'Name', modelValue: '' },
    });
    const input = getByLabelText('Name');
    await fireEvent.update(input, 'Test Value');
    expect(emitted()['update:modelValue'][0]).toEqual(['Test Value']);
  });

  it('displays error message when provided', () => {
    const { getByText } = render(ForgeInput, {
      props: { errorMessage: 'This field is required.' },
    });
    expect(getByText('This field is required.')).toBeDefined();
  });
});
