import Underline from './../../marks/Underline';
import { getExtensionField } from '@tiptap/core'

describe('Underline extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(Underline, 'toMarkdown', Underline)
		expect(toMarkdown).toEqual({
			open: '__',
			close: '__',
			mixable: true,
			expelEnclosingWhitespace: true,
		})
	})
	
})
