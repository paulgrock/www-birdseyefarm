import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'goatsPage',
  title: 'Goats Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Does',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The introduction paragraphs shown at the top of the goats page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Goats Page',
        subtitle: 'Goats page content',
      };
    },
  },
});
