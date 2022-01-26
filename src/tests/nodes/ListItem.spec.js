import { BulletList, ListItem } from './../../nodes'
import Markdown from './../../extensions/Markdown';
import { Editor, getExtensionField } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

describe('ListItem extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(ListItem, 'toMarkdown', ListItem)
		expect(typeof toMarkdown).toEqual('function')
	})
	
	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = new Editor({
			extensions: [ Document, Paragraph, Text, Markdown, BulletList, ListItem ]
		})
		const listItem = editor.schema.nodes.listItem
		expect(listItem.spec.toMarkdown).toBeDefined()
	})
	
})
