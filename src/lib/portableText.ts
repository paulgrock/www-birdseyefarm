import { toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'

export function portableTextToHtml(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return ''
  }

  return toHTML(blocks, {
    components: {
      marks: {
        link: ({ children, value }) => {
          const href = value?.href || ''
          return `<a href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`
        },
      },
    },
  })
}
