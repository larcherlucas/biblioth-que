import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import ForgeAvatar from './ForgeAvatar.vue'

describe('ForgeAvatar', () => {
	it('renders with image when src is provided', () => {
		// Arrange
		render(ForgeAvatar, {
			props: {
				name: 'John Doe',
				src: 'https://avatars.githubusercontent.com/u/16015740?v=4',
			},
		})

		// Act
		const avatar = screen.getByAltText('John Doe')

		// Assert
		expect(avatar).toMatchSnapshot()
		expect(avatar.getAttribute('src')).toBe('https://avatars.githubusercontent.com/u/16015740?v=4')
		expect(avatar.getAttribute('alt')).toBe('John Doe')
	})

	it('renders initials when src is not provided or image fails to load', () => {
		// Arrange
		render(ForgeAvatar, {
			props: {
				name: 'John Doe',
				src: '',
			},
		})

		// Act
		const fallback = screen.getByText('JD')

		// Assert
		expect(fallback).toMatchSnapshot()
		expect(screen.queryByRole('img')).toBeNull()
	})

	it('generates correct initials from name', () => {
		// Arrange
		render(ForgeAvatar, {
			props: {
				name: 'John Michael Doe',
				src: '',
			},
		})

		// Act
		const fallback = screen.getByText('JM')

		// Assert
		expect(fallback).toMatchSnapshot()
	})

	it('emits status-change event when image loads', async () => {
		// Arrange
		const { emitted } = render(ForgeAvatar, {
			props: {
				name: 'John Doe',
				src: 'https://avatars.githubusercontent.com/u/16015740?v=4',
			},
		})

		// Act
		const avatar = screen.getByAltText('John Doe')
		// Manually trigger load event
		await avatar.dispatchEvent(new Event('load'))

		// Assert
		expect(emitted().statusChange[0]).toEqual([{ status: 'loaded' }])
	})

	it('emits status-change event when avatar image fails to load', async () => {
		// Arrange
		const { emitted } = render(ForgeAvatar, {
			props: {
				name: 'John Doe',
				src: 'badImgSrc',
			},
		})

		// Act
		const avatar = screen.getByAltText('John Doe')
		// Manually trigger error event
		await avatar.dispatchEvent(new Event('error'))

		// Assert
		expect(emitted().statusChange[0]).toEqual([{ status: 'error' }])
	})
})
