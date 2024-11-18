import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import ForgeModal from './ForgeModal.vue';

describe('ForgeModal', () => {
  it('opens modal when the trigger is clicked', async () => {
    render(ForgeModal, { slots: { trigger: 'Open Modal' } });

    const trigger = screen.getByText('Open Modal');
    await fireEvent.click(trigger);

    expect(screen.getByText('Default modal content. Customize using slots!')).toBeDefined();
  });

  it('closes modal when the close button is clicked', async () => {
    render(ForgeModal);
    await fireEvent.click(screen.getByText('Open Modal'));
    const closeBtn = screen.getByText('Close');
    await fireEvent.click(closeBtn);

    expect(screen.queryByText('Default modal content. Customize using slots!')).toBeNull();
  });
});
