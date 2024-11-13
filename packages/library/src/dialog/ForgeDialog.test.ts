import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import ForgeDialog from './ForgeDialog.vue'

describe('ForgeDialog', () => {
	it('renders trigger button with default text', () => {
		// Arrange & Act
		render(ForgeDialog)

		// Assert
		const triggerButton = screen.getByRole('button', { name: 'Open Dialog' })
		expect(triggerButton).toBeDefined()
	})

	it('renders trigger button and close button with custom text', () => {
		// Arrange & Act
		render(ForgeDialog, {
			props: {
				triggerText: 'Custom Trigger',
			}
		})

		// Assert
		const triggerButton = screen.getByRole('button', { name: 'Custom Trigger' })
		expect(triggerButton).toBeDefined()
	})

	it('opens dialog and displays content when trigger is clicked', async () => {
		// Arrange
		render(ForgeDialog, {
			props: {
				title: 'Test Title',
				description: 'Test Description'
			}
		})

		// Act
		await fireEvent.click(screen.getByRole('button', { name: 'Open Dialog' }))

		// Assert
		expect(screen.getByText('Test Title')).toBeDefined()
		expect(screen.getByText('Test Description')).toBeDefined()
	})

	it('renders custom slot content', async () => {
		// Arrange
		render(ForgeDialog, {
			slots: {
				default: '<div>Custom Content</div>',
				title: '<h2>Custom Title</h2>',
				triggerText: 'Custom Trigger',
				closeText: 'Close'
			}
		})

		// Act
		await fireEvent.click(screen.getByRole('button', { name: 'Custom Trigger' }))

		// Assert
		expect(screen.getByText('Custom Content')).toBeDefined()
		expect(screen.getByText('Custom Title')).toBeDefined()
    expect(screen.getByText('Close')).toBeDefined()
	})
})
