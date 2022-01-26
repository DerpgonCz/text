import { Markdown } from './../../extensions';
import { createMarkdownSerializer } from './../../extensions/Markdown';
import Underline from './../../marks/Underline';
import { BulletList, ListItem, Image } from './../../nodes'
import { Editor, getExtensionField } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

describe('Markdown extension', () => {
	it('has a config', () => {
		expect(Markdown.config.name).toBe('markdown')
	})

	it('exposes toMarkdown function in Prosemirror', () => {
		const extend = getExtensionField(Markdown, 'extendMarkSchema', Markdown)
		expect(extend(Underline).toMarkdown).toBeDefined()
	})
	
	it('makes toMarkdown available in prose mirror schema', () => {
		const editor = createEditor()
		const serializer = createMarkdownSerializer(editor.schema)
		const underline = serializer.serializer.marks.underline
		expect(underline).toEqual(Underline.config.toMarkdown)
		const listItem = serializer.serializer.nodes.listItem
		expect(typeof listItem).toBe('function')
	})

	it('serializes marks according to their spec', () => {
		const editor = createEditor({ content: '<p><u>Test</u></p>' })
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('__Test__')
	})

	it('serializes nodes according to their spec', () => {
		const editor = createEditor({ content: '<p><ul><li>Hello</li></ul></p>' })
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('\n* Hello')
	})

	it('serializes nodes with the default prosemirror way', () => {
		const editor = createEditor({ content: `
			<img alt="Hello" src="test" />
		` })
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('![Hello](test)')
	})

})

function createEditor({ content } = { content: '' }) {
	return new Editor({
		content,
		extensions: [ 
			Document,
			Paragraph,
			Text,
			Markdown,
			Underline,
			BulletList,
			ListItem,
			Image,
		]
	})
}
